import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { experiences } from "../../data/experience";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headerRefs = useRef<(HTMLElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const anims: gsap.core.Tween[] = [];

    // Headers
    const headers = headerRefs.current.filter(Boolean) as HTMLElement[];
    if (headers.length) {
      anims.push(gsap.from(headers, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        immediateRender: false,
        opacity: 0, y: 15, duration: 0.5, stagger: 0.1, ease: "power2.out",
      }));
    }

    // Timeline line
    if (lineRef.current) {
      anims.push(gsap.from(lineRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", end: "bottom 40%", scrub: 1 },
        scaleY: 0, transformOrigin: "top center",
      }));
    }

    // Cards
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length) {
      anims.push(gsap.from(cards, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        immediateRender: false,
        opacity: 0, y: 30, duration: 0.6, stagger: 0.2, ease: "power2.out",
      }));
    }

    // Dots
    const dots = dotRefs.current.filter(Boolean) as HTMLDivElement[];
    if (dots.length) {
      anims.push(gsap.from(dots, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        immediateRender: false,
        scale: 0, duration: 0.3, stagger: 0.2, ease: "back.out(3)",
      }));
    }

    return () => anims.forEach((a) => a.scrollTrigger?.kill());
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-4xl w-full">
        <p ref={(el) => { headerRefs.current[0] = el; }} className="text-terminal-green/50 font-mono text-[10px] sm:text-xs mb-2">
          luca@portfolio:~$ git log --oneline --career
        </p>
        <h2 ref={(el) => { headerRefs.current[1] = el; }} className="text-terminal-green font-mono text-sm mb-12 tracking-widest uppercase phosphor-glow">
          {">"} Experience Timeline
        </h2>

        <div className="relative">
          <div ref={lineRef} className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-terminal-green/60 via-terminal-green/30 to-transparent md:-translate-x-px" />

          <div className="space-y-10 sm:space-y-16">
            {experiences.map((exp, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={`relative pl-10 sm:pl-16 md:pl-0 ${
                  i % 2 === 0 ? "md:pr-[calc(50%+2rem)] md:text-right" : "md:pl-[calc(50%+2rem)]"
                }`}
              >
                <div
                  ref={(el) => { dotRefs.current[i] = el; }}
                  className={`absolute top-3 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-terminal-green bg-terminal-bg
                    left-2.5 sm:left-4 md:left-1/2 md:-translate-x-1/2 shadow-[0_0_8px_rgba(0,255,65,0.4)]`}
                >
                  <div className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-terminal-green m-[2px] sm:m-[2px]" />
                </div>

                <div className={`hidden md:block absolute top-5 h-px bg-terminal-green/20 w-8 ${i % 2 === 0 ? "right-[50%] mr-2" : "left-[50%] ml-2"}`} />

                <div className="bg-site-surface border border-site-border rounded-lg overflow-hidden hover:border-terminal-green/20 transition-colors duration-300">
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#0e0e0e] border-b border-site-border">
                    <div className="w-2 h-2 rounded-full bg-terminal-green/60" />
                    <span className="text-terminal-gray text-[10px] font-mono">commit #{String(experiences.length - i).padStart(3, "0")}</span>
                    <span className="ml-auto text-terminal-amber text-[10px] font-mono">{exp.period}</span>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="text-site-text font-bold text-sm sm:text-base md:text-lg font-mono">{exp.title}</h3>
                    <p className="text-terminal-cyan text-xs sm:text-sm font-mono mb-3">@ {exp.company}</p>
                    <ul className="space-y-2 text-site-text-dim text-[11px] sm:text-xs md:text-sm font-mono">
                      {exp.description.map((d, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="text-terminal-green/50 shrink-0">$</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={`flex flex-wrap gap-1.5 mt-4 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                      {exp.tags.map((tag) => (
                        <span key={tag} className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-sm bg-terminal-green/5 text-terminal-green/70 border border-terminal-green/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
