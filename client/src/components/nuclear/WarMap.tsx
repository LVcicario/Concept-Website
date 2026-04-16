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

const LAUNCH_SITES: Record<string, [number, number][]> = {
  USA: [[-110, 47], [-104, 41], [-101, 48], [-70, 38], [-160, 35]],
  USSR: [[59, 51], [60, 53], [33, 69], [158, 53], [40, 62], [37, 56]],
  UK: [[-6, 56], [-20, 52]],
  FRANCE: [[-5, 48], [5, 44]],
  CHINA: [[100, 28], [92, 41]],
};

function pickLaunchSite(origin: string): [number, number] {
  const sites = LAUNCH_SITES[origin] || LAUNCH_SITES.USA;
  return sites[Math.floor(Math.random() * sites.length)];
}

interface ActiveMissile {
  id: number;
  ox: number; oy: number; tx: number; ty: number;
  progress: number; // 0→1, incremented each frame based on speed
  baseFlightTime: number;
  impacted: boolean; strike: Strike;
}

interface Impact {
  x: number; y: number; time: number; city: string; yieldKt: number;
}

const MAX_ACTIVE_IMPACTS = 80;
const IMPACT_LIFETIME = 10000;

/** Sleep that respects speed changes in real-time */
function speedSleep(baseMs: number, speedRef: React.RefObject<number>): Promise<void> {
  return new Promise((resolve) => {
    let elapsed = 0;
    const tick = 40;
    const interval = setInterval(() => {
      elapsed += tick * (speedRef.current ?? 1);
      if (elapsed >= baseMs) {
        clearInterval(interval);
        resolve();
      }
    }, tick);
  });
}

export function WarMap({ onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [strikeLog, setStrikeLog] = useState<Strike[]>([]);
  const [totalCasualties, setTotalCasualties] = useState(0);
  const [missilesLaunched, setMissilesLaunched] = useState(0);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(1);
  const missilesRef = useRef<ActiveMissile[]>([]);
  const impactsRef = useRef<Impact[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);
  const projRef = useRef<ReturnType<typeof geoNaturalEarth1> | null>(null);
  const shakeRef = useRef({ x: 0, y: 0, until: 0 });
  const impactCountRef = useRef(0);
  const lastFrameRef = useRef(Date.now());

  useEffect(() => { speedRef.current = speed; }, [speed]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [strikeLog]);

  const launchStrike = useCallback((strike: Strike) => {
    const proj = projRef.current;
    if (!proj) return;
    const launchSite = pickLaunchSite(strike.origin ?? "USA");
    const originPt = proj(launchSite);
    const target = proj([strike.lng, strike.lat]);
    if (!originPt || !target) return;

    const baseFlightTime = strike.phase === 1 ? 12000 : strike.phase === 2 ? 8000 : 4000;

    missilesRef.current.push({
      id: strike.id, ox: originPt[0], oy: originPt[1], tx: target[0], ty: target[1],
      progress: 0, baseFlightTime,
      impacted: false, strike,
    });
    setMissilesLaunched((p) => p + 1);
  }, []);

  // Strike scheduler — uses speedSleep for real-time speed changes
  useEffect(() => {
    let cancelled = false;
    const radarInterval = setInterval(() => playRadarBeep(), 2500);

    async function runStrikes() {
      await speedSleep(500, speedRef);
      for (const strike of STRIKES) {
        if (cancelled) return;
        launchStrike(strike);
        const baseDelay = strike.phase === 1 ? 2500 : strike.phase === 2 ? 600 : 200;
        await speedSleep(baseDelay, speedRef);
      }
      await speedSleep(6000, speedRef);
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
      const deltaTime = now - lastFrameRef.current;
      lastFrameRef.current = now;
      const pathGen = geoPath().projection(proj).context(ctx!);
      const currentSpeed = speedRef.current;

      // Update missile progress based on speed
      for (const m of missilesRef.current) {
        if (m.impacted) continue;
        m.progress += (deltaTime * currentSpeed) / m.baseFlightTime;
        if (m.progress >= 1) {
          m.progress = 1;
          m.impacted = true;
          impactsRef.current.push({ x: m.tx, y: m.ty, time: now, city: m.strike.city, yieldKt: m.strike.yieldKt });
          impactCountRef.current++;
          if (m.strike.phase < 3 || impactCountRef.current % 2 === 0) playImpact();
          const intensity = Math.min(3, m.strike.yieldKt / 300);
          shakeRef.current = { x: (Math.random() - 0.5) * intensity, y: (Math.random() - 0.5) * intensity, until: now + 120 };
          setStrikeLog((prev) => [...prev, m.strike]);
          setTotalCasualties((prev) => prev + m.strike.casualties);
        }
      }

      // Cleanup
      missilesRef.current = missilesRef.current.filter((m) => !m.impacted);
      if (impactsRef.current.length > MAX_ACTIVE_IMPACTS) impactsRef.current = impactsRef.current.slice(-MAX_ACTIVE_IMPACTS);
      impactsRef.current = impactsRef.current.filter((imp) => now - imp.time < IMPACT_LIFETIME);

      // Screen shake
      const shake = shakeRef.current;
      const shaking = now < shake.until;
      if (shaking) {
        ctx!.save();
        ctx!.translate(shake.x, shake.y);
        shakeRef.current.x = (Math.random() - 0.5) * 2;
        shakeRef.current.y = (Math.random() - 0.5) * 2;
      }

      ctx!.fillStyle = "#000";
      ctx!.fillRect(-5, -5, w + 10, h + 10);

      ctx!.beginPath(); pathGen(graticule);
      ctx!.strokeStyle = "rgba(0,255,65,0.04)"; ctx!.lineWidth = 0.5; ctx!.stroke();

      ctx!.beginPath(); pathGen(worldGeo);
      ctx!.strokeStyle = "rgba(0,255,65,0.2)"; ctx!.lineWidth = 0.8; ctx!.stroke();
      ctx!.fillStyle = "rgba(0,255,65,0.02)"; ctx!.fill();

      // Impacts
      for (const imp of impactsRef.current) {
        const age = (now - imp.time) / 1000;
        const ys = Math.sqrt(imp.yieldKt / 100);

        if (age < 3) {
          ctx!.strokeStyle = `rgba(255,80,50,${0.4 * (1 - age / 3)})`;
          ctx!.lineWidth = 1.2;
          ctx!.beginPath(); ctx!.arc(imp.x, imp.y, age * 10, 0, Math.PI * 2); ctx!.stroke();
        }
        if (age < 0.5) {
          ctx!.fillStyle = `rgba(255,255,150,${1 - age / 0.5})`;
          ctx!.beginPath(); ctx!.arc(imp.x, imp.y, 5 + ys * 3, 0, Math.PI * 2); ctx!.fill();
        }
        if (age > 0.3 && age < 5) {
          const ca = age - 0.3;
          const alpha = 0.25 * Math.max(0, 1 - ca / 4.7);
          const ch = Math.min(25 + ys * 8, ca * 12 * ys);
          ctx!.fillStyle = `rgba(255,80,30,${alpha})`;
          ctx!.beginPath(); ctx!.ellipse(imp.x, imp.y - ch / 2, 3 + ca * ys * 0.8, ch / 2, 0, 0, Math.PI * 2); ctx!.fill();
        }
        const pulse = 0.5 + 0.5 * Math.sin(age * 3);
        ctx!.fillStyle = `rgba(255,50,50,${0.4 + pulse * 0.2})`;
        ctx!.beginPath(); ctx!.arc(imp.x, imp.y, 1.5 + pulse * 0.5, 0, Math.PI * 2); ctx!.fill();
        if (age < 3) {
          const la = age < 0.2 ? age / 0.2 : age > 2.5 ? (3 - age) * 2 : 1;
          ctx!.fillStyle = `rgba(255,200,100,${la * 0.6})`;
          ctx!.font = "7px 'JetBrains Mono', monospace";
          ctx!.textAlign = "center";
          ctx!.fillText(imp.city.toUpperCase(), imp.x, imp.y + 12);
        }
      }

      // Missiles
      for (const m of missilesRef.current) {
        const p = m.progress;
        function getArc(t: number): number {
          if (t < 0.15) return Math.sin(t / 0.15 * Math.PI / 2) * 40;
          if (t > 0.85) return Math.sin((1 - (t - 0.85) / 0.15) * Math.PI / 2) * 40;
          return 40 + Math.sin((t - 0.15) / 0.7 * Math.PI) * 20;
        }
        const steps = 20;
        ctx!.strokeStyle = "rgba(0,255,65,0.35)"; ctx!.lineWidth = 0.7;
        ctx!.beginPath();
        for (let j = 0; j <= steps * p; j++) {
          const t = j / steps;
          const x = m.ox + (m.tx - m.ox) * t;
          const y = m.oy + (m.ty - m.oy) * t - getArc(t);
          if (j === 0) ctx!.moveTo(x, y); else ctx!.lineTo(x, y);
        }
        ctx!.stroke();
        const hx = m.ox + (m.tx - m.ox) * p;
        const hy = m.oy + (m.ty - m.oy) * p - getArc(p);
        ctx!.fillStyle = "#00ff41";
        ctx!.beginPath(); ctx!.arc(hx, hy, 1.5, 0, Math.PI * 2); ctx!.fill();
      }

      if (shaking) ctx!.restore();
      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      {/* Header with speed controls */}
      <div className="px-3 sm:px-6 py-2 border-b border-red-500/30 flex items-center justify-between gap-2">
        <span className="text-red-500 font-mono text-[9px] sm:text-xs tracking-widest animate-pulse">
          ⚠ NORAD — THERMONUCLEAR WAR
        </span>

        {/* SPEED BUTTONS — big and visible */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {[1, 2, 3, 4].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`font-mono text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-1.5 rounded cursor-pointer transition-all font-bold
                ${speed === s
                  ? "bg-red-500/40 text-red-300 border-2 border-red-500/70 shadow-[0_0_10px_rgba(255,50,50,0.3)]"
                  : "text-red-500/40 border border-red-500/20 hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/10"
                }`}
            >
              x{s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
        <div className="flex-1 relative min-h-0">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
        <div ref={logRef}
          className="w-full md:w-60 lg:w-68 h-28 md:h-auto overflow-y-auto border-t md:border-t-0 md:border-l border-red-500/20 bg-black/90 p-2 font-mono text-[8px] sm:text-[9px]">
          <div className="text-red-500/50 mb-1.5 uppercase tracking-wider text-[7px]">
            Strikes — {strikeLog.length}/{STRIKES.length}
          </div>
          {strikeLog.slice(-25).map((s) => (
            <div key={s.id} className="mb-1 border-b border-red-500/10 pb-0.5">
              <span className="text-red-400">#{String(s.id).padStart(3, "0")} </span>
              <span className="text-red-300/60">{s.city.toUpperCase()}</span>
              <span className="text-red-400/30"> {s.warhead} ☢{s.casualties.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-3 sm:px-6 py-1.5 border-t border-red-500/30 flex items-center justify-between flex-wrap gap-2 font-mono text-[8px] sm:text-[10px]">
        <span className="text-red-400">MISSILES: {missilesLaunched}/{STRIKES.length}</span>
        <span className="text-red-500 font-bold text-[9px] sm:text-xs">☢ {totalCasualties.toLocaleString()}</span>
        <span className="text-red-400/60">IN FLIGHT: {Math.max(0, missilesLaunched - strikeLog.length)}</span>
      </div>
    </div>
  );
}
