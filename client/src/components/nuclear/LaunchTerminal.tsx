import { useState, useEffect, useRef } from "react";
import { playAlarmBeep } from "./useNuclearAudio";

const LAUNCH_LINES: { text: string; delay: number; color?: string; sound?: boolean }[] = [
  { text: "╔══════════════════════════════════════════════╗", delay: 0, color: "text-red-500" },
  { text: "║  NORTH AMERICAN AEROSPACE DEFENSE COMMAND    ║", delay: 50, color: "text-red-500" },
  { text: "║  CHEYENNE MOUNTAIN COMPLEX — COLORADO        ║", delay: 50, color: "text-red-500" },
  { text: "║  CLASSIFICATION: TOP SECRET / SCI            ║", delay: 50, color: "text-red-500" },
  { text: "╚══════════════════════════════════════════════╝", delay: 50, color: "text-red-500" },
  { text: "", delay: 300 },
  { text: "DATE: 1983-09-26 00:14:03 UTC", delay: 100, color: "text-red-400/70" },
  { text: "OPERATOR: LT. VICARIO, L.", delay: 80, color: "text-red-400/70" },
  { text: "TERMINAL: NORAD-7734", delay: 80, color: "text-red-400/70" },
  { text: "", delay: 500 },
  { text: "⚠ WARNING: EARLY WARNING SYSTEM ACTIVATED", delay: 100, color: "text-red-500", sound: true },
  { text: "⚠ MULTIPLE ICBM LAUNCHES DETECTED", delay: 600, color: "text-red-500", sound: true },
  { text: "  ORIGIN: USSR — ESTIMATED 50+ WARHEADS", delay: 300, color: "text-red-400" },
  { text: "", delay: 800 },
  { text: "INITIATING COUNTERSTRIKE PROTOCOL...", delay: 100, color: "text-red-300" },
  { text: "AUTHENTICATION: ████████████████ VERIFIED", delay: 400, color: "text-red-300" },
  { text: "DEFCON STATUS: 1 — MAXIMUM READINESS", delay: 300, color: "text-red-500" },
  { text: "STRATEGIC AIR COMMAND: WEAPONS FREE", delay: 400, color: "text-red-500", sound: true },
  { text: "", delay: 800 },
  { text: "RELEASING SAFETY INTERLOCKS...", delay: 200, color: "text-red-500" },
  { text: "", delay: 600 },
  { text: "T-MINUS 10 SECONDS", delay: 300, color: "text-white", sound: true },
  { text: "T-MINUS 5", delay: 1000, color: "text-white", sound: true },
  { text: "T-MINUS 3", delay: 800, color: "text-white", sound: true },
  { text: "T-MINUS 2", delay: 600, color: "text-white", sound: true },
  { text: "T-MINUS 1", delay: 500, color: "text-white", sound: true },
  { text: "", delay: 500 },
  { text: "LAUNCH ORDER CONFIRMED.", delay: 200, color: "text-white", sound: true },
  { text: "", delay: 800 },
  { text: "MAY GOD HAVE MERCY ON US ALL.", delay: 300, color: "text-red-400/50" },
];

interface Props { onComplete: () => void; }

export function LaunchTerminal({ onComplete }: Props) {
  const [lines, setLines] = useState<{ text: string; color: string }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [lines]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      for (const line of LAUNCH_LINES) {
        if (cancelled) return;
        await sleep(line.delay);
        if (cancelled) return;
        setLines((prev) => [...prev, { text: line.text, color: line.color ?? "text-red-400" }]);
        if (line.sound) playAlarmBeep();
      }
      await sleep(1500);
      if (!cancelled) onComplete();
    }
    run();
    return () => { cancelled = true; };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      <div className="absolute inset-0 border-2 border-red-500/50 animate-pulse pointer-events-none" />
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12 font-mono text-[10px] sm:text-xs md:text-sm">
        {lines.map((line, i) => (
          <div key={i} className={`${line.color} leading-relaxed min-h-[1.2em]`}>{line.text}</div>
        ))}
        <span className="inline-block w-2 h-3 bg-red-500 animate-pulse" />
      </div>
    </div>
  );
}

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }
