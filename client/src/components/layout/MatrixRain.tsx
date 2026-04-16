import { useEffect, useRef } from "react";

const CHARS = "アイウエオカキクケコサシスセソタチツテト0123456789ABCDEF";

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Skip on mobile for performance
    const isMobile = window.innerWidth < 640;

    let animId: number;
    const fontSize = isMobile ? 16 : 14;
    let columns: number[] = [];

    function resize() {
      // Use half resolution on mobile for performance
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio, 2);
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      ctx!.scale(dpr, dpr);

      const colCount = Math.floor(window.innerWidth / fontSize);
      const newCols = Array.from({ length: colCount }, (_, i) =>
        columns[i] ?? Math.random() * -100,
      );
      columns = newCols;
    }

    resize();
    window.addEventListener("resize", resize);

    // Throttle on mobile — only draw every other frame
    let frameCount = 0;

    function draw() {
      frameCount++;
      if (isMobile && frameCount % 2 !== 0) {
        animId = requestAnimationFrame(draw);
        return;
      }

      ctx!.fillStyle = "rgba(10, 10, 10, 0.06)";
      ctx!.fillRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < columns.length; i++) {
        if (columns[i] < 0) {
          columns[i] += 0.3;
          continue;
        }

        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = columns[i] * fontSize;

        ctx!.fillStyle = "rgba(0, 255, 65, 0.25)";
        ctx!.font = `${fontSize}px "JetBrains Mono", monospace`;
        ctx!.fillText(char, x, y);

        if (columns[i] > 1 && !isMobile) {
          const trailChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          ctx!.fillStyle = "rgba(0, 255, 65, 0.06)";
          ctx!.fillText(trailChar, x, y - fontSize);
        }

        columns[i] += 0.4;

        if (y > window.innerHeight && Math.random() > 0.98) {
          columns[i] = Math.random() * -60;
        }
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.4, width: "100%", height: "100%" }}
    />
  );
}
