import { useEffect, useRef, useState, useCallback } from "react";
import { geoNaturalEarth1, geoPath, geoGraticule } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import worldTopo from "world-atlas/land-50m.json";
import { STRIKES, type Strike } from "./warData";
import { playImpact, playRadarBeep } from "./useNuclearAudio";

const worldGeo = feature(worldTopo as unknown as Topology, (worldTopo as any).objects.land);
const graticule = geoGraticule().step([20, 20])();

interface Props { onComplete: () => void; }

// Silo origins [lng, lat]
const SILOS: [number, number][] = [
  [-110, 48], [40, 64], [62, 55], [93, 40], [-1, 52], [3, 47],
];

function pickSilo(targetLng: number): [number, number] {
  let best = SILOS[0];
  let bestDist = 0;
  for (const s of SILOS) {
    const d = Math.abs(s[0] - targetLng);
    if (d > bestDist) { bestDist = d; best = s; }
  }
  return best;
}

interface ActiveMissile {
  id: number;
  ox: number; oy: number; tx: number; ty: number;
  startTime: number; flightTime: number;
  impacted: boolean; strike: Strike;
  // Smoke trail particles
  trail: { x: number; y: number; age: number }[];
}

interface Impact {
  x: number; y: number; time: number; city: string; yieldKt: number;
}

export function WarMap({ onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [strikeLog, setStrikeLog] = useState<Strike[]>([]);
  const [totalCasualties, setTotalCasualties] = useState(0);
  const [missilesLaunched, setMissilesLaunched] = useState(0);
  const missilesRef = useRef<ActiveMissile[]>([]);
  const impactsRef = useRef<Impact[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);
  const projRef = useRef<ReturnType<typeof geoNaturalEarth1> | null>(null);
  // Screen shake
  const shakeRef = useRef({ x: 0, y: 0, until: 0 });

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [strikeLog]);

  const launchStrike = useCallback((strike: Strike) => {
    const proj = projRef.current;
    if (!proj) return;
    const silo = pickSilo(strike.lng);
    const origin = proj(silo);
    const target = proj([strike.lng, strike.lat]);
    if (!origin || !target) return;

    missilesRef.current.push({
      id: strike.id, ox: origin[0], oy: origin[1], tx: target[0], ty: target[1],
      startTime: Date.now(),
      flightTime: strike.phase === 1 ? 3000 : strike.phase === 2 ? 2000 : 800,
      impacted: false, strike, trail: [],
    });
    setMissilesLaunched((p) => p + 1);
  }, []);

  const checkImpacts = useCallback(() => {
    const now = Date.now();
    for (const m of missilesRef.current) {
      if (m.impacted) continue;
      if (now - m.startTime >= m.flightTime) {
        m.impacted = true;
        impactsRef.current.push({
          x: m.tx, y: m.ty, time: now,
          city: m.strike.city, yieldKt: m.strike.yieldKt,
        });
        playImpact();
        // Screen shake — bigger for bigger yields
        const intensity = Math.min(4, m.strike.yieldKt / 200);
        shakeRef.current = { x: (Math.random() - 0.5) * intensity, y: (Math.random() - 0.5) * intensity, until: now + 150 };
        setStrikeLog((prev) => [...prev, m.strike]);
        setTotalCasualties((prev) => prev + m.strike.casualties);
      }
    }
  }, []);

  // Strike scheduler
  useEffect(() => {
    let cancelled = false;
    const radarInterval = setInterval(() => playRadarBeep(), 2000);

    async function runStrikes() {
      await sleep(500);
      for (const strike of STRIKES) {
        if (cancelled) return;
        launchStrike(strike);
        const delay = strike.phase === 1 ? 1200 : strike.phase === 2 ? 350 : 60 + Math.random() * 40;
        await sleep(delay);
      }
      await sleep(3500);
      if (!cancelled && !doneRef.current) { doneRef.current = true; onComplete(); }
    }
    runStrikes();
    return () => { cancelled = true; clearInterval(radarInterval); };
  }, [launchStrike, onComplete]);

  // Canvas render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = rect.width, h = rect.height;
      projRef.current = geoNaturalEarth1().fitSize([w - 20, h - 20], worldGeo).translate([w / 2, h / 2]);
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      const proj = projRef.current;
      if (!proj) { animId = requestAnimationFrame(draw); return; }
      const w = canvas!.width / Math.min(window.devicePixelRatio, 2);
      const h = canvas!.height / Math.min(window.devicePixelRatio, 2);
      const now = Date.now();
      const pathGen = geoPath().projection(proj).context(ctx!);
      checkImpacts();

      // Screen shake
      const shake = shakeRef.current;
      if (now < shake.until) {
        ctx!.save();
        ctx!.translate(shake.x, shake.y);
        // Update shake for next frame
        shakeRef.current.x = (Math.random() - 0.5) * 3;
        shakeRef.current.y = (Math.random() - 0.5) * 3;
      }

      // Clear
      ctx!.fillStyle = "#000";
      ctx!.fillRect(-5, -5, w + 10, h + 10);

      // Graticule
      ctx!.beginPath();
      pathGen(graticule);
      ctx!.strokeStyle = "rgba(0,255,65,0.04)";
      ctx!.lineWidth = 0.5;
      ctx!.stroke();

      // World map
      ctx!.beginPath();
      pathGen(worldGeo);
      ctx!.strokeStyle = "rgba(0,255,65,0.2)";
      ctx!.lineWidth = 0.8;
      ctx!.stroke();
      ctx!.fillStyle = "rgba(0,255,65,0.02)";
      ctx!.fill();

      // ═══ IMPACTS ═══
      for (const imp of impactsRef.current) {
        const age = (now - imp.time) / 1000;

        // Shockwave rings (double ring)
        if (age < 4) {
          const r1 = age * 12;
          const a1 = 0.5 * Math.max(0, 1 - age / 4);
          ctx!.strokeStyle = `rgba(255,80,50,${a1})`;
          ctx!.lineWidth = 1.5;
          ctx!.beginPath(); ctx!.arc(imp.x, imp.y, r1, 0, Math.PI * 2); ctx!.stroke();

          // Secondary ring (delayed)
          if (age > 0.5) {
            const r2 = (age - 0.5) * 8;
            const a2 = 0.3 * Math.max(0, 1 - (age - 0.5) / 3);
            ctx!.strokeStyle = `rgba(255,150,80,${a2})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath(); ctx!.arc(imp.x, imp.y, r2, 0, Math.PI * 2); ctx!.stroke();
          }
        }

        // Initial flash (big, bright)
        if (age < 0.5) {
          const flashAlpha = 1.0 * (1 - age / 0.5);
          const flashSize = 8 + (imp.yieldKt / 100);
          ctx!.fillStyle = `rgba(255,255,150,${flashAlpha})`;
          ctx!.beginPath(); ctx!.arc(imp.x, imp.y, flashSize, 0, Math.PI * 2); ctx!.fill();
          // Outer glow
          ctx!.fillStyle = `rgba(255,200,100,${flashAlpha * 0.3})`;
          ctx!.beginPath(); ctx!.arc(imp.x, imp.y, flashSize * 2, 0, Math.PI * 2); ctx!.fill();
        }

        // Mushroom cloud glow (vertical plume rising)
        if (age > 0.3 && age < 5) {
          const cloudAge = age - 0.3;
          const cloudAlpha = 0.25 * Math.max(0, 1 - cloudAge / 4.7);
          const cloudHeight = Math.min(40, cloudAge * 20);
          const cloudWidth = 4 + cloudAge * 2;

          // Stem
          const grad = ctx!.createLinearGradient(imp.x, imp.y, imp.x, imp.y - cloudHeight);
          grad.addColorStop(0, `rgba(255,100,30,${cloudAlpha})`);
          grad.addColorStop(0.6, `rgba(255,60,20,${cloudAlpha * 0.5})`);
          grad.addColorStop(1, `rgba(100,30,10,${cloudAlpha * 0.2})`);
          ctx!.fillStyle = grad;
          ctx!.beginPath();
          ctx!.ellipse(imp.x, imp.y - cloudHeight / 2, cloudWidth, cloudHeight / 2, 0, 0, Math.PI * 2);
          ctx!.fill();

          // Mushroom cap
          if (cloudAge > 0.5) {
            const capSize = 3 + cloudAge * 3;
            ctx!.fillStyle = `rgba(255,80,30,${cloudAlpha * 0.6})`;
            ctx!.beginPath();
            ctx!.ellipse(imp.x, imp.y - cloudHeight, capSize * 1.5, capSize * 0.7, 0, 0, Math.PI * 2);
            ctx!.fill();
          }
        }

        // Permanent impact dot
        const pulse = 0.5 + 0.5 * Math.sin(age * 3);
        ctx!.fillStyle = `rgba(255,50,50,${0.5 + pulse * 0.3})`;
        ctx!.beginPath(); ctx!.arc(imp.x, imp.y, 2 + pulse, 0, Math.PI * 2); ctx!.fill();
        ctx!.fillStyle = `rgba(255,80,50,${0.06 + pulse * 0.03})`;
        ctx!.beginPath(); ctx!.arc(imp.x, imp.y, 7, 0, Math.PI * 2); ctx!.fill();

        // City name label
        if (age < 4) {
          const labelAlpha = age < 0.3 ? age / 0.3 : age > 3 ? (4 - age) : 1;
          ctx!.fillStyle = `rgba(255,200,100,${labelAlpha * 0.7})`;
          ctx!.font = "8px 'JetBrains Mono', monospace";
          ctx!.textAlign = "center";
          ctx!.fillText(imp.city.toUpperCase(), imp.x, imp.y + 14);
        }
      }

      // ═══ MISSILES ═══
      for (const m of missilesRef.current) {
        if (m.impacted) continue;
        const progress = Math.min(1, (now - m.startTime) / m.flightTime);

        // Realistic ICBM trajectory: boost → midcourse (high arc) → reentry
        function getArc(t: number): number {
          if (t < 0.15) return Math.sin(t / 0.15 * Math.PI / 2) * 50; // boost
          if (t > 0.85) return Math.sin((1 - (t - 0.85) / 0.15) * Math.PI / 2) * 50; // reentry
          return 50 + Math.sin((t - 0.15) / 0.7 * Math.PI) * 30; // midcourse plateau
        }

        // Smoke trail particles
        if (progress > 0) {
          const hx = m.ox + (m.tx - m.ox) * progress;
          const hy = m.oy + (m.ty - m.oy) * progress - getArc(progress);
          m.trail.push({ x: hx, y: hy, age: 0 });
          if (m.trail.length > 20) m.trail.shift();
        }

        // Draw smoke trail
        for (const p of m.trail) {
          p.age += 0.02;
          if (p.age > 1) continue;
          const ta = 0.15 * (1 - p.age);
          ctx!.fillStyle = `rgba(100,180,100,${ta})`;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, 1.5 * (1 - p.age), 0, Math.PI * 2);
          ctx!.fill();
        }

        // Main missile trail line
        const steps = 30;
        ctx!.strokeStyle = "rgba(0,255,65,0.4)";
        ctx!.lineWidth = 0.8;
        ctx!.beginPath();
        for (let j = 0; j <= steps * progress; j++) {
          const t = j / steps;
          const x = m.ox + (m.tx - m.ox) * t;
          const y = m.oy + (m.ty - m.oy) * t - getArc(t);
          if (j === 0) ctx!.moveTo(x, y); else ctx!.lineTo(x, y);
        }
        ctx!.stroke();

        // MIRV separation — at 75% progress, split into 2-3 sub-warheads
        if (progress > 0.75) {
          const mirvCount = 2;
          for (let k = 0; k < mirvCount; k++) {
            const offset = (k - (mirvCount - 1) / 2) * 8;
            const mirvProgress = (progress - 0.75) / 0.25;
            const mx = m.ox + (m.tx - m.ox) * progress + offset * mirvProgress;
            const my = m.oy + (m.ty - m.oy) * progress - getArc(progress) + Math.abs(offset) * mirvProgress * 0.5;
            ctx!.fillStyle = "rgba(0,255,65,0.6)";
            ctx!.beginPath(); ctx!.arc(mx, my, 1.2, 0, Math.PI * 2); ctx!.fill();
          }
        }

        // Missile head
        const hx = m.ox + (m.tx - m.ox) * progress;
        const hy = m.oy + (m.ty - m.oy) * progress - getArc(progress);
        ctx!.fillStyle = "#00ff41";
        ctx!.beginPath(); ctx!.arc(hx, hy, 2, 0, Math.PI * 2); ctx!.fill();
        ctx!.fillStyle = "rgba(0,255,65,0.15)";
        ctx!.beginPath(); ctx!.arc(hx, hy, 5, 0, Math.PI * 2); ctx!.fill();
      }

      // Cleanup
      missilesRef.current = missilesRef.current.filter((m) => !m.impacted || (now - m.startTime) < m.flightTime + 500);

      // Restore shake
      if (now < shake.until) ctx!.restore();

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, [checkImpacts]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      <div className="px-3 sm:px-6 py-2 border-b border-red-500/30 flex items-center justify-between flex-wrap gap-2">
        <span className="text-red-500 font-mono text-[9px] sm:text-xs tracking-widest animate-pulse">
          ⚠ NORAD STRATEGIC COMMAND — GLOBAL THERMONUCLEAR WAR
        </span>
        <span className="text-red-400/60 font-mono text-[8px] sm:text-[10px]">DEFCON 1</span>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
        <div className="flex-1 relative min-h-0">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
        <div ref={logRef}
          className="w-full md:w-64 lg:w-72 h-32 md:h-auto overflow-y-auto border-t md:border-t-0 md:border-l border-red-500/20 bg-black/90 p-2 sm:p-3 font-mono text-[8px] sm:text-[9px]">
          <div className="text-red-500/50 mb-2 uppercase tracking-wider text-[7px] sm:text-[8px]">
            Strike Report — {strikeLog.length}/{STRIKES.length}
          </div>
          {strikeLog.slice(-30).map((s) => (
            <div key={s.id} className="mb-1.5 border-b border-red-500/10 pb-1">
              <div className="text-red-400">#{String(s.id).padStart(3, "0")} {s.city.toUpperCase()}</div>
              <div className="text-red-400/40">{s.warhead} ({s.yieldKt}kt) — {s.country}</div>
              <div className="text-red-300/50">☢ {s.casualties.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-3 sm:px-6 py-1.5 sm:py-2 border-t border-red-500/30 flex items-center justify-between flex-wrap gap-2 font-mono text-[8px] sm:text-[10px]">
        <span className="text-red-400">MISSILES: {missilesLaunched}/{STRIKES.length}</span>
        <span className="text-red-500 font-bold text-[9px] sm:text-xs">CASUALTIES: {totalCasualties.toLocaleString()}</span>
        <span className="text-red-400/60">IN FLIGHT: {Math.max(0, missilesLaunched - strikeLog.length)}</span>
      </div>
    </div>
  );
}

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }
