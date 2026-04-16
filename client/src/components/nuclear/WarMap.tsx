import { useEffect, useRef, useState, useCallback } from "react";
import { geoNaturalEarth1, geoPath, geoGraticule } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import worldTopo from "world-atlas/land-50m.json";
import { STRIKES, type Strike } from "./warData";
import { playImpact, playRadarBeep } from "./useNuclearAudio";

// Extract land features from TopoJSON
const worldGeo = feature(worldTopo as unknown as Topology, (worldTopo as any).objects.land);
const graticule = geoGraticule().step([20, 20])();

interface Props {
  onComplete: () => void;
}

interface ActiveMissile {
  id: number;
  ox: number; oy: number;
  tx: number; ty: number;
  startTime: number;
  flightTime: number;
  impacted: boolean;
  strike: Strike;
}

interface Impact {
  x: number; y: number; time: number;
}

// Silo origins
const SILOS: [number, number][] = [
  [-110, 48],  // Montana, USA
  [40, 64],    // Plesetsk, USSR
  [62, 55],    // Urals, USSR
  [93, 40],    // China
  [-1, 52],    // UK
  [3, 47],     // France
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

export function WarMap({ onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [strikeLog, setStrikeLog] = useState<Strike[]>([]);
  const [totalCasualties, setTotalCasualties] = useState(0);
  const [missilesLaunched, setMissilesLaunched] = useState(0);
  const missilesRef = useRef<ActiveMissile[]>([]);
  const impactsRef = useRef<Impact[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);
  const projectionRef = useRef<ReturnType<typeof geoNaturalEarth1> | null>(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [strikeLog]);

  const launchStrike = useCallback((strike: Strike) => {
    const proj = projectionRef.current;
    if (!proj) return;

    const silo = pickSilo(strike.lng);
    const origin = proj(silo);
    const target = proj([strike.lng, strike.lat]);
    if (!origin || !target) return;

    const flightTime = strike.phase === 1 ? 3000 : strike.phase === 2 ? 2000 : 800;

    missilesRef.current.push({
      id: strike.id,
      ox: origin[0], oy: origin[1],
      tx: target[0], ty: target[1],
      startTime: Date.now(),
      flightTime,
      impacted: false,
      strike,
    });

    setMissilesLaunched((p) => p + 1);
  }, []);

  const checkImpacts = useCallback(() => {
    const now = Date.now();
    for (const m of missilesRef.current) {
      if (m.impacted) continue;
      if (now - m.startTime >= m.flightTime) {
        m.impacted = true;
        impactsRef.current.push({ x: m.tx, y: m.ty, time: now });
        playImpact();
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
      // Wait a bit for projection to init
      await sleep(500);
      for (const strike of STRIKES) {
        if (cancelled) return;
        launchStrike(strike);
        const delay = strike.phase === 1 ? 1200 : strike.phase === 2 ? 350 : 60 + Math.random() * 40;
        await sleep(delay);
      }
      await sleep(3500);
      if (!cancelled && !doneRef.current) {
        doneRef.current = true;
        onComplete();
      }
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

      // Setup projection to fit canvas
      const w = rect.width;
      const h = rect.height;
      const projection = geoNaturalEarth1()
        .fitSize([w - 20, h - 20], worldGeo)
        .translate([w / 2, h / 2]);
      projectionRef.current = projection;
    }

    resize();
    window.addEventListener("resize", resize);

    function draw() {
      const proj = projectionRef.current;
      if (!proj) { animId = requestAnimationFrame(draw); return; }

      const w = canvas!.width / Math.min(window.devicePixelRatio, 2);
      const h = canvas!.height / Math.min(window.devicePixelRatio, 2);
      const now = Date.now();
      const pathGen = geoPath().projection(proj).context(ctx!);

      checkImpacts();

      // Clear
      ctx!.fillStyle = "#000";
      ctx!.fillRect(0, 0, w, h);

      // Graticule (grid lines)
      ctx!.beginPath();
      pathGen(graticule);
      ctx!.strokeStyle = "rgba(0,255,65,0.04)";
      ctx!.lineWidth = 0.5;
      ctx!.stroke();

      // World outline — the real map
      ctx!.beginPath();
      pathGen(worldGeo);
      ctx!.strokeStyle = "rgba(0,255,65,0.2)";
      ctx!.lineWidth = 0.8;
      ctx!.stroke();
      // Subtle fill
      ctx!.fillStyle = "rgba(0,255,65,0.02)";
      ctx!.fill();

      // Impacts
      for (const imp of impactsRef.current) {
        const age = (now - imp.time) / 1000;

        // Shockwave
        if (age < 3) {
          const radius = age * 12;
          ctx!.strokeStyle = `rgba(255,50,50,${0.4 * (1 - age / 3)})`;
          ctx!.lineWidth = 1.5;
          ctx!.beginPath();
          ctx!.arc(imp.x, imp.y, radius, 0, Math.PI * 2);
          ctx!.stroke();
        }

        // Flash
        if (age < 0.3) {
          ctx!.fillStyle = `rgba(255,255,200,${0.8 * (1 - age / 0.3)})`;
          ctx!.beginPath();
          ctx!.arc(imp.x, imp.y, 5, 0, Math.PI * 2);
          ctx!.fill();
        }

        // Permanent dot
        const pulse = 0.5 + 0.5 * Math.sin(age * 3);
        ctx!.fillStyle = `rgba(255,50,50,${0.5 + pulse * 0.3})`;
        ctx!.beginPath();
        ctx!.arc(imp.x, imp.y, 2 + pulse, 0, Math.PI * 2);
        ctx!.fill();

        // Glow
        ctx!.fillStyle = `rgba(255,80,50,${0.06 + pulse * 0.03})`;
        ctx!.beginPath();
        ctx!.arc(imp.x, imp.y, 7, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Missiles
      for (const m of missilesRef.current) {
        if (m.impacted) continue;
        const progress = Math.min(1, (now - m.startTime) / m.flightTime);

        // Trail
        const steps = 25;
        ctx!.strokeStyle = "rgba(0,255,65,0.5)";
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        for (let j = 0; j <= steps * progress; j++) {
          const t = j / steps;
          const x = m.ox + (m.tx - m.ox) * t;
          const y = m.oy + (m.ty - m.oy) * t - Math.sin(t * Math.PI) * 30;
          if (j === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }
        ctx!.stroke();

        // Head
        const hx = m.ox + (m.tx - m.ox) * progress;
        const hy = m.oy + (m.ty - m.oy) * progress - Math.sin(progress * Math.PI) * 30;
        ctx!.fillStyle = "#00ff41";
        ctx!.beginPath();
        ctx!.arc(hx, hy, 2, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = "rgba(0,255,65,0.15)";
        ctx!.beginPath();
        ctx!.arc(hx, hy, 5, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Cleanup
      missilesRef.current = missilesRef.current.filter((m) => !m.impacted || (now - m.startTime) < m.flightTime + 500);

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, [checkImpacts]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      {/* Header */}
      <div className="px-3 sm:px-6 py-2 border-b border-red-500/30 flex items-center justify-between flex-wrap gap-2">
        <span className="text-red-500 font-mono text-[9px] sm:text-xs tracking-widest animate-pulse">
          ⚠ NORAD STRATEGIC COMMAND — GLOBAL THERMONUCLEAR WAR
        </span>
        <span className="text-red-400/60 font-mono text-[8px] sm:text-[10px]">DEFCON 1</span>
      </div>

      {/* Map + Log */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
        <div className="flex-1 relative min-h-0">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>

        <div
          ref={logRef}
          className="w-full md:w-64 lg:w-72 h-32 md:h-auto overflow-y-auto border-t md:border-t-0 md:border-l border-red-500/20 bg-black/90 p-2 sm:p-3 font-mono text-[8px] sm:text-[9px]"
        >
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

      {/* Bottom */}
      <div className="px-3 sm:px-6 py-1.5 sm:py-2 border-t border-red-500/30 flex items-center justify-between flex-wrap gap-2 font-mono text-[8px] sm:text-[10px]">
        <span className="text-red-400">MISSILES: {missilesLaunched}/{STRIKES.length}</span>
        <span className="text-red-500 font-bold text-[9px] sm:text-xs">CASUALTIES: {totalCasualties.toLocaleString()}</span>
        <span className="text-red-400/60">IN FLIGHT: {Math.max(0, missilesLaunched - strikeLog.length)}</span>
      </div>
    </div>
  );
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
