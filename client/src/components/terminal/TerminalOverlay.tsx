import { useState, useRef, useEffect, useCallback } from "react";
import { useAppStore } from "../../stores/appStore";
import { executeCommand } from "../../lib/commands";
import { useEasterEggStore } from "../../stores/easterEggStore";
import { playSuccessChime } from "../../lib/audio";

interface Line {
  type: "input" | "output";
  text: string;
}

export function TerminalOverlay() {
  const open = useAppStore((s) => s.terminalOverlayOpen);
  const close = useAppStore((s) => s.closeTerminalOverlay);
  const discover = useEasterEggStore((s) => s.discover);
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: 'Terminal overlay active. Type "help" for commands.' },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const cmd = input;
      setInput("");

      const newLines: Line[] = [{ type: "input", text: `> ${cmd}` }];
      const result = executeCommand(cmd);
      result.output.forEach((line) => newLines.push({ type: "output", text: line }));

      setLines((prev) => [...prev, ...newLines]);

      if (result.action === "clear") {
        setLines([]);
      } else if (result.action === "exit") {
        setTimeout(close, 300);
      } else if (result.action === "navigate" && result.target) {
        setTimeout(() => {
          close();
          document.querySelector(result.target!)?.scrollIntoView({ behavior: "smooth" });
        }, 500);
      } else if (result.action === "easter-egg-terminal") {
        playSuccessChime();
        discover("terminal");
      } else if (result.action === "easter-egg-console") {
        playSuccessChime();
        discover("console");
      }
    },
    [input, close, discover],
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={close} />

      {/* Terminal window */}
      <div className="relative w-full max-w-2xl max-h-[80vh] bg-terminal-bg border border-terminal-green/30 rounded-lg overflow-hidden shadow-[0_0_40px_rgba(0,255,65,0.1)]">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#111] border-b border-terminal-green/20">
          <div className="w-2.5 h-2.5 rounded-full bg-terminal-red cursor-pointer" onClick={close} />
          <div className="w-2.5 h-2.5 rounded-full bg-terminal-amber" />
          <div className="w-2.5 h-2.5 rounded-full bg-terminal-green" />
          <span className="ml-2 text-terminal-gray text-[10px] font-mono">
            luca@portfolio — interactive
          </span>
          <span className="ml-auto text-terminal-gray/40 text-[9px] font-mono">
            ESC to close
          </span>
        </div>

        {/* Content */}
        <div ref={scrollRef} className="overflow-y-auto p-4 font-mono text-xs sm:text-sm" style={{ maxHeight: "calc(80vh - 90px)" }}>
          {lines.map((line, i) => (
            <div
              key={i}
              className={`leading-relaxed ${
                line.type === "input"
                  ? "text-terminal-green"
                  : "text-terminal-text"
              }`}
            >
              {line.text || "\u00A0"}
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-terminal-green/10">
          <span className="text-terminal-green text-sm font-mono">{">"}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-terminal-green font-mono text-sm outline-none placeholder:text-terminal-gray/30"
            placeholder="type a command..."
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}
