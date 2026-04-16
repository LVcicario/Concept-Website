import { useState, useEffect } from "react";
import { TOTAL_CASUALTIES, TOTAL_WARHEADS, NATIONS_AFFECTED } from "./warData";

interface Props { onComplete: () => void; }

const REPORT_LINES = [
  { text: "╔══════════════════════════════════════════════╗", speed: 50 },
  { text: "║           SIMULATION COMPLETE                ║", speed: 50 },
  { text: "╠══════════════════════════════════════════════╣", speed: 50 },
  { text: "║                                              ║", speed: 50 },
  { text: `║  TOTAL WARHEADS DEPLOYED:   ${String(TOTAL_WARHEADS).padStart(3)}              ║`, speed: 80 },
  { text: `║  NATIONS AFFECTED:           ${String(NATIONS_AFFECTED).padStart(2)}              ║`, speed: 80 },
  { text: `║  ESTIMATED CASUALTIES: ${TOTAL_CASUALTIES.toLocaleString().padStart(13)}   ║`, speed: 200 },
  { text: "║  GLOBAL INFRASTRUCTURE:  DESTROYED           ║", speed: 150 },
  { text: "║  WINNER:                 NONE                ║", speed: 200 },
  { text: "║                                              ║", speed: 50 },
  { text: "║  STATUS: ALL ASSETS EXPENDED                 ║", speed: 80 },
  { text: "║  RECOMMENDATION: N/A                         ║", speed: 80 },
  { text: "║                                              ║", speed: 50 },
  { text: "╠══════════════════════════════════════════════╣", speed: 50 },
  { text: "║  TERMINAL SESSION CLOSED                     ║", speed: 80 },
  { text: "║  NORAD-7734 — SIGNING OFF                    ║", speed: 80 },
  { text: "╚══════════════════════════════════════════════╝", speed: 50 },
];

export function Aftermath({ onComplete }: Props) {
  const [lines, setLines] = useState<string[]>([]);
  const [phase, setPhase] = useState<"silence" | "report" | "hold" | "flash" | "fade">("silence");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      // 2.5 seconds of dread silence
      setPhase("silence");
      await sleep(2500);
      if (cancelled) return;

      // Type report with variable speed
      setPhase("report");
      for (const line of REPORT_LINES) {
        if (cancelled) return;
        setLines((prev) => [...prev, line.text]);
        await sleep(line.speed);
      }

      // Hold on the completed report
      setPhase("hold");
      await sleep(4000);
      if (cancelled) return;

      // Brief green flash — scope going dark
      setPhase("flash");
      await sleep(300);
      if (cancelled) return;

      // Long fade to black
      setPhase("fade");
      await sleep(2500);
      if (!cancelled) onComplete();
    }

    run();
    return () => { cancelled = true; };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-[2000ms] ${
      phase === "fade" ? "opacity-0" : "opacity-100"
    }`}>
      {/* Silence — glitchy waiting */}
      {phase === "silence" && (
        <div className="text-center">
          <p className="text-red-500/40 font-mono text-xs animate-pulse tracking-widest">
            AWAITING RESPONSE...
          </p>
          <p className="text-red-500/15 font-mono text-[9px] mt-2">
            NO SIGNAL DETECTED
          </p>
        </div>
      )}

      {/* Report + Hold */}
      {(phase === "report" || phase === "hold") && (
        <div className="p-4 sm:p-8 max-w-full overflow-x-auto">
          <pre className="text-red-400/80 font-mono text-[8px] sm:text-[10px] md:text-xs leading-relaxed whitespace-pre">
            {lines.join("\n")}
          </pre>
          {phase === "report" && lines.length < REPORT_LINES.length && (
            <span className="inline-block w-2 h-3 bg-red-500 animate-pulse ml-0.5" />
          )}
        </div>
      )}

      {/* Green flash — scope dying */}
      {phase === "flash" && (
        <div className="absolute inset-0 bg-terminal-green/20" />
      )}
    </div>
  );
}

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }
