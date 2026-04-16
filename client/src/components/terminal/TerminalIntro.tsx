import { useState, useRef, useEffect, useCallback } from "react";
import { CRTEffect } from "./CRTEffect";
import { resumeAudio, playCRTOn, startAmbientHum, stopAmbientHum, playKeystroke, playBootBeep, playEnterKey } from "../../lib/audio";

const RESPONSES: Record<string, string[]> = {
  help: [
    "╔════════════════════════════════════════╗",
    "║         AVAILABLE COMMANDS             ║",
    "╠════════════════════════════════════════╣",
    "║                                        ║",
    "║  ./start   ← START THE PORTFOLIO       ║",
    "║  whoami    — Display current user       ║",
    "║  ls        — List files                 ║",
    "║  date      — Show current date          ║",
    "║  clear     — Clear terminal             ║",
    "║                                        ║",
    "╚════════════════════════════════════════╝",
    "",
    "→ Type ./start to begin the experience.",
  ],
  whoami: ["visitor@unknown-terminal", "Access level: GUEST", "Clearance: PENDING"],
  date: [`${new Date().toISOString().split("T")[0]} — ${new Date().toLocaleTimeString()}`],
  ls: ["README.md    system.conf    start.sh    .classified/"],
  "cat readme.md": ["# Welcome", "", "This is a restricted terminal.", "Run ./start to initialize the portfolio system."],
  "cat .classified/": ["Permission denied. Nice try."],
  "ls .classified": ["Permission denied. Nice try."],
  "cd .classified": ["Permission denied."],
  sudo: ["This incident will be reported."],
  rm: ["Nice try. Permission denied."],
  hello: ["Hello, visitor. Type ./start to begin."],
  hi: ["Hi there. Ready when you are — type ./start"],
  "": [],
};

interface Props {
  onStart: () => void;
}

export function TerminalIntro({ onStart }: Props) {
  const [crtOn, setCrtOn] = useState(false);
  const [ready, setReady] = useState(false);
  const [lines, setLines] = useState<{ text: string; type: "system" | "input" | "output" | "error" }[]>([]);
  const [input, setInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hintTimerRef = useRef<number>(0);

  // CRT power on
  useEffect(() => {
    const t1 = setTimeout(() => { setCrtOn(true); playCRTOn(); startAmbientHum(); }, 300);
    const t2 = setTimeout(() => {
      setReady(true);
      setLines([
        { text: "LV-SYSTEM v4.2.0 — Luca Vicario Systems", type: "system" },
        { text: "Terminal ready. Type a command.", type: "system" },
        { text: "", type: "system" },
      ]);
    }, 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); stopAmbientHum(); };
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  // Focus input
  useEffect(() => {
    if (ready) setTimeout(() => inputRef.current?.focus(), 100);
  }, [ready]);

  // Show hint after 8s of inactivity
  useEffect(() => {
    if (!ready) return;
    hintTimerRef.current = window.setTimeout(() => setShowHint(true), 8000);
    return () => clearTimeout(hintTimerRef.current);
  }, [ready, lines]);

  // Resume audio on interaction
  useEffect(() => {
    const handler = () => resumeAudio();
    window.addEventListener("click", handler, { once: true });
    window.addEventListener("keydown", handler, { once: true });
    return () => { window.removeEventListener("click", handler); window.removeEventListener("keydown", handler); };
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    setInput("");
    setShowHint(false);
    clearTimeout(hintTimerRef.current);
    hintTimerRef.current = window.setTimeout(() => setShowHint(true), 8000);

    playEnterKey();

    const newLines: typeof lines = [{ text: `$ ${input}`, type: "input" }];

    // Check for start command
    if (cmd === "./start" || cmd === "start" || cmd === "./start.sh" || cmd === "run" || cmd === "run portfolio") {
      playBootBeep();
      newLines.push({ text: "", type: "system" });
      newLines.push({ text: "> INITIALIZING PORTFOLIO SYSTEM...", type: "system" });
      newLines.push({ text: "> LOADING MODULES...", type: "system" });
      newLines.push({ text: "> ACCESS GRANTED.", type: "system" });
      setLines((prev) => [...prev, ...newLines]);

      // Transition after a beat
      setTimeout(() => {
        stopAmbientHum();
        onStart();
      }, 1500);
      return;
    }

    // Check for clear
    if (cmd === "clear") {
      setLines([]);
      return;
    }

    // Check known commands
    const key = Object.keys(RESPONSES).find((k) => cmd === k || cmd.startsWith(k + " "));
    if (key && RESPONSES[key].length > 0) {
      playKeystroke();
      RESPONSES[key].forEach((line) => newLines.push({ text: line, type: "output" }));
    } else if (cmd) {
      newLines.push({ text: `bash: ${input}: command not found`, type: "error" });
      newLines.push({ text: "Try ./start to launch the portfolio, or help for commands.", type: "output" });
    }

    newLines.push({ text: "", type: "system" });
    setLines((prev) => [...prev, ...newLines]);
  }, [input, onStart]);

  return (
    <CRTEffect poweredOn={crtOn}>
      <div className={`h-full bg-terminal-bg flex flex-col ${crtOn ? "crt-power-on" : "opacity-0"}`}>
        {/* Header */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#111] border-b border-terminal-gray/20">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-terminal-red" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-terminal-amber" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-terminal-green" />
          <span className="ml-2 sm:ml-3 text-terminal-gray text-[10px] sm:text-xs font-mono truncate">
            luca@vicario-systems — login
          </span>
        </div>

        {/* Terminal content */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-3 sm:px-6 md:px-8 py-3 sm:py-4 font-mono text-[11px] sm:text-xs md:text-sm"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className={`leading-relaxed min-h-[1.2em] ${
                line.type === "input" ? "text-terminal-green phosphor-glow" :
                line.type === "error" ? "text-terminal-red" :
                line.type === "system" ? "text-terminal-amber" :
                "text-terminal-text"
              }`}
            >
              {line.text}
            </div>
          ))}

          {/* Input line */}
          {ready && (
            <form onSubmit={handleSubmit} className="flex items-center gap-1">
              <span className="text-terminal-green phosphor-glow">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => { setInput(e.target.value); setShowHint(false); }}
                className="flex-1 bg-transparent text-terminal-green font-mono text-[11px] sm:text-xs md:text-sm outline-none caret-terminal-green phosphor-glow"
                autoComplete="off"
                spellCheck={false}
                autoFocus
              />
              <span className="inline-block w-1.5 sm:w-2 h-3 sm:h-3.5 bg-terminal-green terminal-cursor" />
            </form>
          )}
        </div>

        {/* Hint */}
        {showHint && (
          <div className="px-3 sm:px-6 pb-3 sm:pb-4">
            <p className="text-terminal-green/60 font-mono text-xs sm:text-sm animate-pulse">
              → type <span className="text-terminal-green font-bold">./start</span> and press Enter
            </p>
          </div>
        )}

        {/* Scanline sweep */}
        <div className="crt-scanline-sweep" />
      </div>
    </CRTEffect>
  );
}
