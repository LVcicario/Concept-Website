import { useState, useEffect } from "react";
import { TOTAL_CASUALTIES, TOTAL_WARHEADS, NATIONS_AFFECTED } from "./warData";

interface Props {
  onComplete: () => void;
}

const REPORT_LINES = [
  "╔══════════════════════════════════════════════���",
  "║           SIMULATION COMPLETE                ║",
  "╠══════════════════════════════════════════════╣",
  "║                                              ║",
  `║  TOTAL WARHEADS DEPLOYED:   ${String(TOTAL_WARHEADS).padStart(3)}              ║`,
  `║  NATIONS AFFECTED:           ${String(NATIONS_AFFECTED).padStart(2)}              ║`,
  `║  ESTIMATED CASUALTIES: ${TOTAL_CASUALTIES.toLocaleString().padStart(13)}   ║`,
  "║  GLOBAL INFRASTRUCTURE:  DESTROYED           ║",
  "��  WINNER:                 NONE                ║",
  "║                                              ║",
  "║  STATUS: ALL ASSETS EXPENDED                 ║",
  "║  RECOMMENDATION: N/A                         ║",
  "║                                              ║",
  "╠══════════════════════════════════════════════╣",
  "║  TERMINAL SESSION CLOSED                     ║",
  "║  NORAD-7734 — SIGNING OFF                    ║",
  "╚══════════════════════════════════════════════╝",
];

export function Aftermath({ onComplete }: Props) {
  const [lines, setLines] = useState<string[]>([]);
  const [phase, setPhase] = useState<"silence" | "report" | "fade">("silence");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      // 2 seconds of silence
      setPhase("silence");
      await sleep(2000);
      if (cancelled) return;

      // Type out report
      setPhase("report");
      for (const line of REPORT_LINES) {
        if (cancelled) return;
        setLines((prev) => [...prev, line]);
        await sleep(150);
      }

      // Hold for 4 seconds
      await sleep(4000);
      if (cancelled) return;

      // Fade out
      setPhase("fade");
      await sleep(1500);
      if (!cancelled) onComplete();
    }

    run();
    return () => { cancelled = true; };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-1000 ${
        phase === "fade" ? "opacity-0" : "opacity-100"
      }`}
    >
      {phase === "silence" && (
        <div className="text-red-500/30 font-mono text-xs animate-pulse">
          . . .
        </div>
      )}

      {(phase === "report" || phase === "fade") && (
        <div className="p-4 sm:p-8 max-w-full overflow-x-auto">
          <pre className="text-red-400/80 font-mono text-[8px] sm:text-[10px] md:text-xs leading-relaxed whitespace-pre">
            {lines.join("\n")}
          </pre>
          {phase === "report" && lines.length < REPORT_LINES.length && (
            <span className="inline-block w-2 h-3 bg-red-500 animate-pulse ml-0.5" />
          )}
        </div>
      )}
    </div>
  );
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
