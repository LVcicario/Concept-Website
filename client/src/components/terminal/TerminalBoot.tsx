import { useState, useCallback, useEffect, useRef } from "react";
import { CRTEffect } from "./CRTEffect";
import {
  resumeAudio,
  playKeystroke,
  playBootBeep,
  playSuccessChime,
  playDiskSeek,
  playCRTOn,
  startAmbientHum,
  stopAmbientHum,
} from "../../lib/audio";

/* ─── Boot sequence ─── */

interface BootLine {
  text: string;
  speed: number;
  delay: number;
  color?: string;
  sound?: "beep" | "disk" | "success";
  instant?: boolean;
}

/* Compact ASCII logo — fits 30 chars wide (safe for 320px screens) */
const ASCII_LOGO = `██╗    ██╗   ██╗
██║    ██║   ██║
██║    ██║   ██║
██║    ╚██╗ ██╔╝
█████╗  ╚████╔╝
╚════╝   ╚═══╝  VICARIO`;

const BOOT_SEQUENCE: BootLine[] = [
  { text: "LV-BIOS v4.2.0", speed: 0, delay: 400, color: "text-terminal-text", instant: true, sound: "beep" },
  { text: "(C) 2025 Vicario Industries", speed: 0, delay: 200, color: "text-terminal-gray", instant: true },
  { text: "", speed: 0, delay: 100, instant: true },
  { text: "CPU: Problem Solver @ 3.8GHz .. OK", speed: 15, delay: 200, color: "text-terminal-text" },
  { text: "RAM: 8 Years Experience ...... OK", speed: 15, delay: 50 },
  { text: "GPU: UI/UX Processing ........ OK", speed: 15, delay: 50 },
  { text: "", speed: 0, delay: 100, instant: true },
  { text: "Loading modules...", speed: 25, delay: 200, color: "text-terminal-amber" },
  { text: "  TypeScript ......... [OK]", speed: 12, delay: 100, sound: "disk" },
  { text: "  React + Node.js ... [OK]", speed: 12, delay: 80 },
  { text: "  Supabase + PG ..... [OK]", speed: 12, delay: 80 },
  { text: "  GSAP + Anims ...... [OK]", speed: 12, delay: 80 },
  { text: "  AI / LLM .......... [OK]", speed: 12, delay: 80 },
  { text: "  Leadership ........ [OK]", speed: 12, delay: 80 },
  { text: "", speed: 0, delay: 100, instant: true },
  { text: "Career modules:", speed: 25, delay: 300, color: "text-terminal-cyan" },
  { text: "  > nexalis.ai .. Founder", speed: 15, delay: 150, sound: "disk" },
  { text: "  > ABB ......... AI Expert", speed: 15, delay: 100 },
  { text: "  > Retail ...... Director", speed: 15, delay: 100 },
  { text: "", speed: 0, delay: 100, instant: true },
  { text: "All systems operational.", speed: 20, delay: 300, color: "text-terminal-green", sound: "success" },
  { text: "", speed: 0, delay: 100, instant: true },
  { text: "Connecting to portfolio...", speed: 30, delay: 200, color: "text-terminal-green" },
  { text: "Ready.", speed: 50, delay: 400, color: "text-terminal-green", sound: "success" },
];

/* ─── Component ─── */

interface TerminalBootProps {
  onComplete: () => void;
}

export function TerminalBoot({ onComplete }: TerminalBootProps) {
  const [crtOn, setCrtOn] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [lines, setLines] = useState<{ text: string; color: string }[]>([]);
  const [currentTyping, setCurrentTyping] = useState("");
  const [currentColor, setCurrentColor] = useState("text-terminal-text");
  const [showCursor, setShowCursor] = useState(true);
  const [skipped, setSkipped] = useState(false);
  const abortRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines, currentTyping]);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setCrtOn(true);
      playCRTOn();
      startAmbientHum();
    }, 300);
    const t2 = setTimeout(() => setShowContent(true), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); stopAmbientHum(); };
  }, []);

  useEffect(() => {
    if (!showContent || skipped) return;
    abortRef.current = false;
    let cancelled = false;

    async function runSequence() {
      for (let i = 0; i < BOOT_SEQUENCE.length; i++) {
        if (cancelled || abortRef.current) return;
        const line = BOOT_SEQUENCE[i];

        await sleep(line.delay);
        if (cancelled || abortRef.current) return;

        if (line.sound === "beep") playBootBeep();
        if (line.sound === "disk") playDiskSeek();
        if (line.sound === "success") playSuccessChime();

        if (line.instant || line.speed === 0) {
          setLines((prev) => [...prev, { text: line.text, color: line.color ?? "text-terminal-text" }]);
        } else {
          setCurrentColor(line.color ?? "text-terminal-text");
          for (let j = 0; j <= line.text.length; j++) {
            if (cancelled || abortRef.current) return;
            setCurrentTyping(line.text.slice(0, j));
            if (j < line.text.length && line.text[j] !== " ") playKeystroke();
            await sleep(line.speed);
          }
          setLines((prev) => [...prev, { text: line.text, color: line.color ?? "text-terminal-text" }]);
          setCurrentTyping("");
        }
      }

      if (!cancelled && !abortRef.current) {
        await sleep(600);
        setShowCursor(false);
        stopAmbientHum();
        onComplete();
      }
    }

    runSequence();
    return () => { cancelled = true; };
  }, [showContent, skipped, onComplete]);

  const handleSkip = useCallback(() => {
    if (skipped) return;
    resumeAudio();
    abortRef.current = true;
    setSkipped(true);
    playSuccessChime();
    stopAmbientHum();
    setCurrentTyping("");
    setLines(BOOT_SEQUENCE.map((l) => ({ text: l.text, color: l.color ?? "text-terminal-text" })));
    setTimeout(() => { setShowCursor(false); onComplete(); }, 500);
  }, [skipped, onComplete]);

  useEffect(() => {
    const handler = () => resumeAudio();
    window.addEventListener("click", handler, { once: true });
    window.addEventListener("keydown", handler, { once: true });
    return () => { window.removeEventListener("click", handler); window.removeEventListener("keydown", handler); };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Enter" || e.key === "Escape") handleSkip(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleSkip]);

  return (
    <CRTEffect poweredOn={crtOn}>
      <div className={`h-full bg-terminal-bg flex flex-col ${crtOn ? "crt-power-on" : "opacity-0"}`}>
        {/* Header bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#111] border-b border-terminal-gray/20">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-terminal-red" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-terminal-amber" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-terminal-green" />
          <span className="ml-2 sm:ml-3 text-terminal-gray text-[10px] sm:text-xs font-mono truncate">
            luca@vicario ~ POST
          </span>
        </div>

        {/* ASCII Logo */}
        {showContent && (
          <div className="px-3 sm:px-6 md:px-8 pt-3 sm:pt-4 overflow-x-auto">
            <pre className="text-terminal-green phosphor-glow text-[8px] sm:text-[10px] md:text-xs leading-tight whitespace-pre font-mono">
              {ASCII_LOGO}
            </pre>
          </div>
        )}

        {/* Terminal content */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto px-3 sm:px-6 md:px-8 py-3 sm:py-4 font-mono text-[10px] sm:text-xs md:text-sm"
        >
          {lines.map((line, i) => (
            <div key={i} className={`${line.color} phosphor-glow leading-relaxed min-h-[1.2em] break-all sm:break-normal`}>
              {line.text}
            </div>
          ))}

          {currentTyping && (
            <div className={`${currentColor} phosphor-glow leading-relaxed break-all sm:break-normal`}>
              {currentTyping}
              {showCursor && (
                <span className="inline-block w-1.5 sm:w-2 h-3 sm:h-3.5 ml-0.5 bg-terminal-green terminal-cursor align-middle" />
              )}
            </div>
          )}

          {!currentTyping && showCursor && showContent && (
            <div className="leading-relaxed">
              <span className="inline-block w-1.5 sm:w-2 h-3 sm:h-3.5 bg-terminal-green terminal-cursor" />
            </div>
          )}
        </div>

        <div className="crt-scanline-sweep" />

        {/* Skip — tap area larger on mobile */}
        <button
          onClick={handleSkip}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 text-terminal-gray text-[10px] sm:text-xs font-mono
                     hover:text-terminal-green transition-colors cursor-pointer
                     border border-terminal-gray/30 px-2.5 py-1.5 sm:px-3 rounded
                     hover:border-terminal-green/50 bg-terminal-bg/80 backdrop-blur-sm"
        >
          Skip
        </button>
      </div>
    </CRTEffect>
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
