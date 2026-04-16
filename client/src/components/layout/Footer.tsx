import { useState } from "react";
import { useEasterEggStore } from "../../stores/easterEggStore";
import { playNuclearAlert, resumeAudio } from "../../lib/audio";

export function Footer() {
  const setNuclearTriggered = useEasterEggStore((s) => s.setNuclearTriggered);
  const nuclearTriggered = useEasterEggStore((s) => s.nuclearTriggered);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [keyTurned, setKeyTurned] = useState(false);

  const handleLaunch = () => {
    setConfirmOpen(false);
    setKeyTurned(true);
    playNuclearAlert();
    setTimeout(() => playNuclearAlert(), 500);
    setTimeout(() => setNuclearTriggered(), 1500);
  };

  return (
    <footer className="border-t border-terminal-green/10">
      {/* Normal footer */}
      <div className="py-8 sm:py-10 px-4 sm:px-6">
        <div className="text-center space-y-2 sm:space-y-3">
          <div className="text-terminal-green/20 font-mono text-[10px] sm:text-xs">
            {">"} SESSION COMPLETE — THANK YOU
          </div>
          <p className="text-terminal-gray/40 font-mono text-[9px] sm:text-[10px]">
            Built with React + TypeScript + GSAP — Crafted by Luca Vicario
          </p>
          <p className="text-terminal-green/20 font-mono text-[9px] sm:text-[10px]">
            Press <kbd className="text-terminal-green/40 border border-terminal-green/10 px-1 rounded">`</kbd> to open terminal
          </p>
          <p className="text-terminal-gray/10 font-mono text-[7px] select-none">
            {"// "}some secrets respond to classic gestures...
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          NUCLEAR LAUNCH CONSOLE
          ═══════════════════════════════════════════ */}
      {!nuclearTriggered && (
        <div className="border-t border-red-900/20">
          <div className="flex flex-col items-center py-16 sm:py-20 px-4">

            {/* Soviet ministry header */}
            <div className="text-center mb-8 sm:mb-10">
              <p className="text-red-500/30 font-mono text-[8px] sm:text-[9px] tracking-[0.4em] uppercase">
                ☢ Министерство Обороны СССР ☢
              </p>
              <p className="text-red-500/15 font-mono text-[7px] sm:text-[8px] tracking-widest mt-1">
                MINISTRY OF DEFENCE — STRATEGIC ROCKET FORCES
              </p>
            </div>

            {/* Hazard stripe */}
            <div
              className="w-48 sm:w-64 h-1 rounded-full overflow-hidden mb-8 sm:mb-10"
              style={{ background: "repeating-linear-gradient(45deg, rgba(255,50,50,0.15) 0px, rgba(255,50,50,0.15) 4px, transparent 4px, transparent 8px)" }}
            />

            {/* Launch button — triple ring */}
            <div className="flex items-center justify-center">
              <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full border-2 border-red-500/20 flex items-center justify-center relative">

                {/* Labels on ring */}
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-red-500/25 font-mono text-[7px] sm:text-[8px] bg-site-bg px-2 tracking-widest">
                  ОПАСНО
                </span>
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-red-500/25 font-mono text-[7px] sm:text-[8px] bg-site-bg px-2 tracking-widest">
                  DANGER
                </span>
                <span className="absolute top-1/2 -left-3 -translate-y-1/2 -rotate-90 text-red-500/15 font-mono text-[6px] sm:text-[7px] bg-site-bg px-1 tracking-widest">
                  ЯДЕРНЫЙ
                </span>
                <span className="absolute top-1/2 -right-3 -translate-y-1/2 rotate-90 text-red-500/15 font-mono text-[6px] sm:text-[7px] bg-site-bg px-1 tracking-widest">
                  NUCLEAR
                </span>

                {/* Inner ring */}
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-red-500/30 flex items-center justify-center bg-red-900/5">

                  {/* THE BUTTON */}
                  <button
                    onClick={() => { resumeAudio(); playNuclearAlert(); setConfirmOpen(true); }}
                    disabled={keyTurned}
                    className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 flex flex-col items-center justify-center
                      transition-all duration-500 cursor-pointer
                      ${keyTurned
                        ? "border-red-500 bg-red-500/30 shadow-[0_0_40px_rgba(255,50,50,0.5)] animate-pulse"
                        : "border-red-500/40 bg-red-900/20 hover:bg-red-900/40 hover:border-red-500/70 hover:shadow-[0_0_25px_rgba(255,50,50,0.2)] active:scale-95"
                      }`}
                  >
                    <span className="text-red-500 text-2xl sm:text-3xl mb-0.5">☭</span>
                    <span className="text-red-500 font-mono text-[9px] sm:text-xs font-bold tracking-wider">
                      {keyTurned ? "ЗАПУСК..." : "ПУСК"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Label under */}
            <div className="text-center mt-8 sm:mt-10 space-y-1.5">
              <p className="text-red-500/40 font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase">
                {keyTurned ? "LAUNCH SEQUENCE INITIATED" : "ВОЙНА ОБЪЯВЛЕНА"}
              </p>
              <p className="text-red-500/20 font-mono text-[7px] sm:text-[8px] tracking-wider">
                {keyTurned ? "STAND BY FOR AUTHORIZATION..." : "GLOBAL THERMONUCLEAR STRIKE"}
              </p>
            </div>

            {/* Hazard stripe bottom */}
            <div
              className="w-48 sm:w-64 h-1 rounded-full overflow-hidden mt-8 sm:mt-10"
              style={{ background: "repeating-linear-gradient(45deg, rgba(255,50,50,0.15) 0px, rgba(255,50,50,0.15) 4px, transparent 4px, transparent 8px)" }}
            />

            {/* Bottom text */}
            <p className="text-red-500/10 font-mono text-[6px] sm:text-[7px] tracking-widest mt-6 text-center">
              РВСН — РАКЕТНЫЕ ВОЙСКА СТРАТЕГИЧЕСКОГО НАЗНАЧЕНИЯ
            </p>
          </div>
        </div>
      )}

      {/* ═══ CONFIRMATION MODAL ═══ */}
      {confirmOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setConfirmOpen(false)} />

          <div className="relative w-full max-w-sm sm:max-w-md bg-[#0a0a08] border border-red-500/40 rounded-lg overflow-hidden shadow-[0_0_60px_rgba(255,50,50,0.1)]">
            {/* Modal header */}
            <div className="bg-red-900/30 border-b border-red-500/30 px-4 sm:px-6 py-3 sm:py-4 text-center">
              <p className="text-red-500 font-mono text-xs sm:text-sm font-bold tracking-[0.3em] animate-pulse">
                ⚠ ПОДТВЕРЖДЕНИЕ ЗАПУСКА ⚠
              </p>
              <p className="text-red-400/40 font-mono text-[8px] sm:text-[10px] mt-1 tracking-wider">
                LAUNCH CONFIRMATION REQUIRED
              </p>
            </div>

            {/* Modal body */}
            <div className="px-4 sm:px-6 py-6 sm:py-8 text-center space-y-4 sm:space-y-5">
              <div className="space-y-3">
                <p className="text-red-400/60 font-mono text-xs sm:text-sm">
                  Вы собираетесь инициировать
                </p>
                <p className="text-red-500 font-mono font-bold text-lg sm:text-xl tracking-wider">
                  ГЛОБАЛЬНЫЙ ЯДЕРНЫЙ УДАР
                </p>
                <div className="space-y-1 pt-2">
                  <p className="text-red-400/35 font-mono text-[10px] sm:text-xs">
                    300 thermonuclear warheads will be deployed.
                  </p>
                  <p className="text-red-400/35 font-mono text-[10px] sm:text-xs">
                    Estimated casualties: 4,000,000,000+
                  </p>
                  <p className="text-red-500/50 font-mono text-[10px] sm:text-xs font-bold mt-3">
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-3">
                <button
                  onClick={() => setConfirmOpen(false)}
                  className="flex-1 py-2.5 sm:py-3 border border-terminal-gray/30 text-terminal-gray font-mono text-xs sm:text-sm rounded
                             hover:border-terminal-green/40 hover:text-terminal-green transition-all cursor-pointer"
                >
                  ОТМЕНА
                </button>
                <button
                  onClick={handleLaunch}
                  className="flex-1 py-2.5 sm:py-3 bg-red-900/40 border border-red-500/50 text-red-500 font-mono text-xs sm:text-sm font-bold rounded
                             hover:bg-red-600 hover:text-white hover:border-red-500 hover:shadow-[0_0_25px_rgba(255,50,50,0.4)]
                             transition-all cursor-pointer tracking-wider"
                >
                  ПОДТВЕРДИТЬ
                </button>
              </div>

              <p className="text-red-500/15 font-mono text-[6px] sm:text-[7px] tracking-widest pt-2">
                РВСН — РАКЕТНЫЕ ВОЙСКА СТРАТЕГИЧЕСКОГО НАЗНАЧЕНИЯ
              </p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
