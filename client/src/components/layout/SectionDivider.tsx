import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

interface SectionDividerProps {
  command: string;
}

export function SectionDivider({ command }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        scaleX: 0,
        duration: 0.8,
        ease: "power2.inOut",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="max-w-4xl mx-auto px-6 py-2 origin-left">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-terminal-green/40 to-transparent" />
        <span className="text-terminal-green/40 font-mono text-[8px] sm:text-[10px] tracking-wider sm:tracking-widest whitespace-nowrap overflow-hidden text-ellipsis max-w-[50%] sm:max-w-none">
          {command}
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-terminal-green/40 to-transparent" />
      </div>
    </div>
  );
}
