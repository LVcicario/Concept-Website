import { useEffect, useRef, useState, useCallback } from "react";
import { STRIKES, type Strike } from "./warData";
import { WORLD_OUTLINES } from "./worldMap";
import { playImpact, playRadarBeep } from "./useNuclearAudio";

interface Props {
  onComplete: () => void;
}

// Silo origins (lat/lng) — missiles originate from these
const SILO_ORIGINS: [number, number][] = [
  [48.5, -110],   // Montana, USA
  [64, 40],       // Plesetsk, USSR
  [55, 62],       // Urals, USSR
  [40, 93],       // Gansu, China
  [52, -1],       // UK
  [47, 3],        // France
];

// Convert lat/lng to Mercator x,y (0-1)
function toXY(lat: number, lng: number): [number, number] {
  return [(lng + 180) / 360, (90 - lat) / 180];
}

// Pick the nearest silo to approximate realistic trajectory
function pickSilo(_targetLat: number, targetLng: number): [number, number] {
  let best = SILO_ORIGINS[0];
  let bestDist = Infinity;
  for (const s of SILO_ORIGINS) {
    // Pick silos from the OPPOSITE side (enemies shoot at you)
    const d = Math.abs(s[1] - targetLng);
    // Prefer silos far from target (ICBMs cross the globe)
    if (d > 40 && d < bestDist + 100) {
      bestDist = d;
      best = s;
    }
  }
  // Fallback: just pick a random one far away
  if (bestDist === Infinity) {
    best = SILO_ORIGINS[Math.floor(Math.random() * SILO_ORIGINS.length)];
  }
  return best;
}

interface ActiveMissile {
  id: number;
  ox: number; oy: number; // origin
  tx: number; ty: number; // target
  startTime: number;
  flightTime: number; // ms
  impacted: boolean;
  strike: Strike;
}

interface Impact {
  x: number;
  y: number;
  time: number;
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
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [strikeLog]);

  const launchStrike = useCallback((strike: Strike) => {
    const silo = pickSilo(strike.lat, strike.lng);
    const [ox, oy] = toXY(silo[0], silo[1]);
    const [tx, ty] = toXY(strike.lat, strike.lng);

    const flightTime =
      strike.phase === 1 ? 3000 :
      strike.phase === 2 ? 2000 :
      800;

    missilesRef.current.push({
      id: strike.id,
      ox, oy, tx, ty,
      startTime: Date.now(),
      flightTime,
      impacted: false,
      strike,
    });

    setMissilesLaunched((p) => p + 1);
  }, []);

  // Handle impacts in animation loop
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
    startTimeRef.current = Date.now();

    async function runStrikes() {
      for (const strike of STRIKES) {
        if (cancelled) return;
        launchStrike(strike);
        const delay =
          strike.phase === 1 ? 1200 :
          strike.phase === 2 ? 350 :
          60 + Math.random() * 40;
        await sleep(delay);
      }
      // Wait for last missiles to land
      await sleep(3500);
      if (!cancelled && !doneRef.current) {
        doneRef.current = true;
        onComplete();
      }
    }

    runStrikes();
    return () => { cancelled = true; clearInterval(radarInterval); };
  }, [launchStrike, onComplete]);

  // Canvas render loop
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
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      const w = canvas!.width / Math.min(window.devicePixelRatio, 2);
      const h = canvas!.height / Math.min(window.devicePixelRatio, 2);
      const now = Date.now();

      // Check for new impacts
      checkImpacts();

      // Clear
      ctx!.fillStyle = "#000";
      ctx!.fillRect(0, 0, w, h);

      // Grid
      ctx!.strokeStyle = "rgba(0,255,65,0.04)";
      ctx!.lineWidth = 0.5;
      for (let i = 0; i <= 18; i++) {
        const y = (i / 18) * h;
        ctx!.beginPath(); ctx!.moveTo(0, y); ctx!.lineTo(w, y); ctx!.stroke();
      }
      for (let i = 0; i <= 36; i++) {
        const x = (i / 36) * w;
        ctx!.beginPath(); ctx!.moveTo(x, 0); ctx!.lineTo(x, h); ctx!.stroke();
      }

      // World map outlines
      ctx!.strokeStyle = "rgba(0,255,65,0.18)";
      ctx!.lineWidth = 0.8;
      for (const outline of WORLD_OUTLINES) {
        if (outline.length < 2) continue;
        ctx!.beginPath();
        for (let i = 0; i < outline.length; i++) {
          const px = outline[i][0] * w;
          const py = outline[i][1] * h;
          if (i === 0) ctx!.moveTo(px, py);
          else ctx!.lineTo(px, py);
        }
        ctx!.closePath();
        ctx!.stroke();
      }

      // Impacts — permanent red dots with expanding shockwave
      for (const imp of impactsRef.current) {
        const age = (now - imp.time) / 1000;
        const px = imp.x * w;
        const py = imp.y * h;

        // Shockwave ring (fades over 3 seconds)
        if (age < 3) {
          const radius = age * 15;
          const alpha = Math.max(0, 0.4 * (1 - age / 3));
          ctx!.strokeStyle = `rgba(255,50,50,${alpha})`;
          ctx!.lineWidth = 1.5;
          ctx!.beginPath();
          ctx!.arc(px, py, radius, 0, Math.PI * 2);
          ctx!.stroke();
        }

        // Flash (first 0.3s)
        if (age < 0.3) {
          const flashAlpha = 0.8 * (1 - age / 0.3);
          ctx!.fillStyle = `rgba(255,255,200,${flashAlpha})`;
          ctx!.beginPath();
          ctx!.arc(px, py, 6, 0, Math.PI * 2);
          ctx!.fill();
        }

        // Permanent dot (pulsing)
        const pulse = 0.5 + 0.5 * Math.sin(age * 3);
        ctx!.fillStyle = `rgba(255,50,50,${0.5 + pulse * 0.3})`;
        ctx!.beginPath();
        ctx!.arc(px, py, 2 + pulse, 0, Math.PI * 2);
        ctx!.fill();

        // Glow
        ctx!.fillStyle = `rgba(255,80,50,${0.08 + pulse * 0.04})`;
        ctx!.beginPath();
        ctx!.arc(px, py, 8, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Active missile arcs
      for (const m of missilesRef.current) {
        if (m.impacted) continue;
        const elapsed = now - m.startTime;
        const progress = Math.min(1, elapsed / m.flightTime);

        // Draw trail
        const trailPoints = 30;
        ctx!.strokeStyle = "rgba(0,255,65,0.5)";
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        for (let j = 0; j <= trailPoints * progress; j++) {
          const t = j / trailPoints;
          const x = m.ox + (m.tx - m.ox) * t;
          const y = m.oy + (m.ty - m.oy) * t - Math.sin(t * Math.PI) * 0.06;
          if (j === 0) ctx!.moveTo(x * w, y * h);
          else ctx!.lineTo(x * w, y * h);
        }
        ctx!.stroke();

        // Missile head (bright green dot)
        const headT = progress;
        const hx = m.ox + (m.tx - m.ox) * headT;
        const hy = m.oy + (m.ty - m.oy) * headT - Math.sin(headT * Math.PI) * 0.06;
        ctx!.fillStyle = "#00ff41";
        ctx!.beginPath();
        ctx!.arc(hx * w, hy * h, 2.5, 0, Math.PI * 2);
        ctx!.fill();

        // Head glow
        ctx!.fillStyle = "rgba(0,255,65,0.2)";
        ctx!.beginPath();
        ctx!.arc(hx * w, hy * h, 6, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Clean up old missiles (keep impacts forever)
      missilesRef.current = missilesRef.current.filter((m) => !m.impacted || (now - m.startTime) < m.flightTime + 1000);

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
        <span className="text-red-400/60 font-mono text-[8px] sm:text-[10px]">
          DEFCON 1
        </span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
        {/* Map */}
        <div className="flex-1 relative min-h-0">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>

        {/* Strike log */}
        <div
          ref={logRef}
          className="w-full md:w-64 lg:w-72 h-32 md:h-auto overflow-y-auto border-t md:border-t-0 md:border-l border-red-500/20 bg-black/90 p-2 sm:p-3 font-mono text-[8px] sm:text-[9px]"
        >
          <div className="text-red-500/50 mb-2 uppercase tracking-wider text-[7px] sm:text-[8px]">
            Strike Report — {strikeLog.length}/{STRIKES.length}
          </div>
          {strikeLog.slice(-30).map((s) => (
            <div key={s.id} className="mb-1.5 border-b border-red-500/10 pb-1">
              <div className="text-red-400">
                #{String(s.id).padStart(3, "0")} {s.city.toUpperCase()}
              </div>
              <div className="text-red-400/40">
                {s.warhead} ({s.yieldKt}kt) — {s.country}
              </div>
              <div className="text-red-300/50">
                ☢ {s.casualties.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-3 sm:px-6 py-1.5 sm:py-2 border-t border-red-500/30 flex items-center justify-between flex-wrap gap-2 font-mono text-[8px] sm:text-[10px]">
        <span className="text-red-400">
          MISSILES: {missilesLaunched}/{STRIKES.length}
        </span>
        <span className="text-red-500 font-bold text-[9px] sm:text-xs">
          CASUALTIES: {totalCasualties.toLocaleString()}
        </span>
        <span className="text-red-400/60">
          IN FLIGHT: {missilesRef.current.filter((m) => !m.impacted).length}
        </span>
      </div>
    </div>
  );
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
