import { useEffect, useRef, useState } from "react";

interface Props {
  onComplete: () => void;
}

/**
 * Soviet Declassified Document transition.
 *
 * 1. Fake USSR classified document with Cyrillic + censored bars
 * 2. Red stamp "СЕКРЕТНО" slams down
 * 3. VHS distortion / tape degradation
 * 4. Signal lost → CRT off
 */
export function ParticleDissolve({ onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"document" | "stamp" | "vhs" | "static" | "poweroff" | "black">("document");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("stamp"), 1200),
      setTimeout(() => setPhase("vhs"), 3000),
      setTimeout(() => setPhase("static"), 4800),
      setTimeout(() => setPhase("poweroff"), 5800),
      setTimeout(() => setPhase("black"), 6400),
      setTimeout(() => onComplete(), 7000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // VHS static canvas
  useEffect(() => {
    if (phase !== "vhs" && phase !== "static") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    let animId: number;
    let frame = 0;

    function draw() {
      frame++;
      const isStatic = phase === "static";
      const intensity = isStatic ? 0.85 : 0.12 + Math.min(0.35, frame * 0.004);

      ctx!.fillStyle = `rgba(0, 0, 0, ${isStatic ? 0.4 : 0.7})`;
      ctx!.fillRect(0, 0, w, h);

      const imageData = ctx!.createImageData(w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() < intensity) {
          const v = Math.random() * 50;
          data[i] = v * 0.3;
          data[i + 1] = v;
          data[i + 2] = v * 0.3;
          data[i + 3] = Math.random() * 160;
        }
      }
      ctx!.putImageData(imageData, 0, 0);

      const trackingLines = isStatic ? 10 : 3 + Math.floor(frame / 12);
      for (let i = 0; i < trackingLines; i++) {
        const y = (frame * 2.5 + i * (h / trackingLines)) % h;
        ctx!.fillStyle = `rgba(0, ${120 + Math.random() * 80}, 40, ${0.1 + Math.random() * 0.1})`;
        ctx!.fillRect(0, y, w, 1 + Math.random() * (isStatic ? 5 : 2));
      }

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  const showDoc = phase === "document" || phase === "stamp";

  return (
    <div className="fixed inset-0 z-[55] bg-[#0a0a08] overflow-hidden">
      {/* ═══ SOVIET CLASSIFIED DOCUMENT ═══ */}
      {showDoc && (
        <div className="w-full h-full flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-xl bg-[#0c0c0a] border border-red-900/40 rounded-sm p-5 sm:p-8 relative font-mono">

            {/* Top header — Soviet style */}
            <div className="text-center mb-5 sm:mb-6 border-b border-red-900/30 pb-4">
              <div className="text-red-500/80 text-lg sm:text-xl tracking-[0.5em] font-bold mb-1">
                ☆ КГБ ☆
              </div>
              <div className="text-red-500/50 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase">
                Комитет Государственной Безопасности
              </div>
              <div className="text-red-500/30 text-[8px] sm:text-[9px] tracking-widest mt-1">
                COMMITTEE FOR STATE SECURITY — USSR
              </div>
            </div>

            {/* Document metadata */}
            <div className="space-y-2 text-[10px] sm:text-xs mb-5 sm:mb-6">
              <div className="flex justify-between">
                <span className="text-red-400/50">Дело №:</span>
                <span className="text-red-400/70">LV-7734-ЛИЧНОЕ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-400/50">Дата:</span>
                <span className="text-red-400/70">26.09.1983</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-400/50">Оператор:</span>
                <span className="text-red-400/70">ЛТ. ВИКАРИО, Л.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-400/50">Гриф:</span>
                <span className="text-red-500 font-bold">СОВЕРШЕННО СЕКРЕТНО</span>
              </div>
            </div>

            {/* Document body with censored bars */}
            <div className="space-y-2.5 text-[10px] sm:text-xs text-red-400/40 mb-6">
              <p>
                СУБЪЕКТ: <span className="text-red-400/60">VICARIO, Luca</span> — оперативный
                профиль подтвержден. Полный доступ к{" "}
                <span className="bg-red-500/30 text-transparent select-none px-8">REDACTED</span>{" "}
                системам.
              </p>
              <p>
                Квалификация:{" "}
                <span className="text-red-400/60">TypeScript, React, Node.js, AI/ML</span>.
                Руководил операцией с{" "}
                <span className="text-red-400/60">110 оперативниками</span>.
                Предыдущее назначение:{" "}
                <span className="bg-red-500/30 text-transparent select-none px-12">REDACTED</span>.
              </p>
              <p>
                Статус: <span className="text-red-400/60">АКТИВЕН</span>. Текущая операция:{" "}
                <span className="bg-red-500/30 text-transparent select-none px-16">REDACTED</span>.
                Уровень допуска:{" "}
                <span className="text-red-500 font-bold">ВЫСШИЙ</span>.
              </p>
              <p className="text-red-400/25">
                Рекомендация: немедленное привлечение к проекту{" "}
                <span className="bg-red-500/30 text-transparent select-none px-10">REDACTED</span>.
                Подпись:{" "}
                <span className="bg-red-500/30 text-transparent select-none px-6">REDACTED</span>.
              </p>
            </div>

            {/* Bottom — declassification notice */}
            <div className="border-t border-red-900/30 pt-3 flex justify-between items-end">
              <div>
                <div className="text-red-400/25 text-[8px] sm:text-[9px]">РАССЕКРЕЧЕНО: 01.12.2025</div>
                <div className="text-red-400/15 text-[7px] sm:text-[8px]">DECLASSIFIED PER ORDER #LV-2025</div>
              </div>
              <div className="text-red-400/20 text-[8px]">
                СТР. 1/1
              </div>
            </div>

            {/* ═══ RED STAMP — slams down ═══ */}
            {phase === "stamp" && (
              <>
                {/* Main stamp */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                             text-red-600 font-mono text-3xl sm:text-5xl md:text-6xl font-black
                             tracking-[0.2em] rotate-[-12deg]
                             border-[3px] sm:border-4 border-red-600 rounded-sm
                             px-4 sm:px-8 py-1.5 sm:py-3
                             opacity-0 animate-[sovietStamp_0.12s_0.1s_ease-out_forwards]"
                >
                  СЕКРЕТНО
                </div>

                {/* Secondary stamp */}
                <div
                  className="absolute top-[30%] right-[5%] sm:right-[10%]
                             text-red-500/70 font-mono text-sm sm:text-xl font-bold
                             tracking-[0.15em] rotate-[6deg]
                             border-2 border-red-500/70 rounded-sm
                             px-3 sm:px-5 py-1 sm:py-1.5
                             opacity-0 animate-[sovietStamp_0.12s_0.6s_ease-out_forwards]"
                >
                  ЗАПРЕЩЕНО
                </div>

                {/* Circle stamp — like an official seal */}
                <div
                  className="absolute bottom-[15%] left-[8%] sm:left-[12%]
                             w-16 h-16 sm:w-24 sm:h-24 rounded-full
                             border-2 border-red-500/50
                             flex items-center justify-center
                             rotate-[15deg]
                             opacity-0 animate-[sovietStamp_0.12s_1.0s_ease-out_forwards]"
                >
                  <div className="text-center">
                    <div className="text-red-500/60 text-[7px] sm:text-[9px] font-mono font-bold leading-tight">
                      КГБ СССР
                    </div>
                    <div className="text-red-500/80 text-base sm:text-xl">☆</div>
                    <div className="text-red-500/40 text-[6px] sm:text-[8px] font-mono">
                      1983
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ═══ VHS DISTORTION ═══ */}
      {(phase === "vhs" || phase === "static") && (
        <div className="w-full h-full relative">
          <canvas ref={canvasRef} className="w-full h-full" />

          {phase === "vhs" && (
            <>
              <div className="absolute top-3 right-3 sm:top-5 sm:right-5 text-red-500/60 font-mono text-[10px] sm:text-xs animate-pulse">
                ◄◄ ПЕРЕМОТКА
              </div>
              <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 text-red-400/20 font-mono text-[9px] sm:text-[10px]">
                АРХИВ КГБ — ПЛЁНКА №7734
              </div>
              {/* Faint classified text bleeding through */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-red-500/10 font-mono text-3xl sm:text-5xl font-black tracking-[0.3em] rotate-[-12deg]
                               animate-[vhsBleed_0.5s_infinite_alternate]">
                  СЕКРЕТНО
                </div>
              </div>
            </>
          )}

          {phase === "static" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-red-500/50 font-mono text-sm sm:text-xl tracking-[0.5em] animate-pulse mb-2">
                  НЕТ СИГНАЛА
                </div>
                <div className="text-red-400/20 font-mono text-[9px] sm:text-[10px] tracking-widest">
                  SIGNAL LOST
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CRT power-off */}
      {phase === "poweroff" && (
        <div className="w-full h-full bg-terminal-bg crt-power-off" />
      )}

      {/* Black */}
      {phase === "black" && (
        <div className="w-full h-full bg-black" />
      )}
    </div>
  );
}
