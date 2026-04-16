import { useEffect, useRef, useState } from "react";
import { gsap } from "../../lib/gsap";
import { playSectionEnter } from "../../lib/audio";

interface SectionDividerProps {
  command: string;
}

export function SectionDivider({ command }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lineLeftRef = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [typed, setTyped] = useState("");
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    // Lines expand from center
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          if (!hasPlayed.current) {
            hasPlayed.current = true;
            playSectionEnter();
            // Typewriter effect on command text
            let i = 0;
            const interval = setInterval(() => {
              i++;
              if (i > command.length) { clearInterval(interval); return; }
              setTyped(command.slice(0, i));
            }, 35);
          }
        },
        onLeaveBack: () => {
          hasPlayed.current = false;
          setTyped("");
        },
      },
    });

    tl.from(lineLeftRef.current, { scaleX: 0, duration: 0.5, ease: "power2.out", transformOrigin: "right center" })
      .from(lineRightRef.current, { scaleX: 0, duration: 0.5, ease: "power2.out", transformOrigin: "left center" }, "<")
      .from(textRef.current, { opacity: 0, scale: 0.8, duration: 0.3, ease: "back.out(1.7)" }, "-=0.3");

    return () => tl.scrollTrigger?.kill();
  }, [command]);

  return (
    <div ref={ref} className="max-w-4xl mx-auto px-6 py-4 sm:py-6">
      <div className="flex items-center gap-3">
        <div ref={lineLeftRef} className="h-px flex-1 bg-gradient-to-r from-transparent via-terminal-green/30 to-terminal-green/40" />
        <span
          ref={textRef}
          className="text-terminal-green/50 font-mono text-[8px] sm:text-[10px] tracking-wider whitespace-nowrap px-2"
        >
          <span className="text-terminal-green/30">$</span> {typed}
          {typed.length < command.length && typed.length > 0 && (
            <span className="inline-block w-1 h-2.5 bg-terminal-green/50 ml-0.5 animate-pulse align-middle" />
          )}
        </span>
        <div ref={lineRightRef} className="h-px flex-1 bg-gradient-to-l from-transparent via-terminal-green/30 to-terminal-green/40" />
      </div>
    </div>
  );
}
