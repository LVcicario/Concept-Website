import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { skills } from "../../data/skills";

const categoryConfig: Record<string, { label: string; color: string; border: string; glow: string }> = {
  frontend: { label: "// Frontend", color: "text-terminal-green", border: "border-terminal-green/20", glow: "shadow-[0_0_8px_rgba(0,255,65,0.15)]" },
  backend: { label: "// Backend", color: "text-terminal-green", border: "border-terminal-green/20", glow: "shadow-[0_0_8px_rgba(0,255,65,0.12)]" },
  ai: { label: "// AI & Automation", color: "text-terminal-cyan", border: "border-terminal-cyan/20", glow: "shadow-[0_0_8px_rgba(0,212,255,0.15)]" },
  devops: { label: "// DevOps & Infra", color: "text-terminal-cyan", border: "border-terminal-cyan/20", glow: "shadow-[0_0_8px_rgba(0,212,255,0.12)]" },
  business: { label: "// Business & Leadership", color: "text-terminal-amber", border: "border-terminal-amber/20", glow: "shadow-[0_0_8px_rgba(255,184,0,0.15)]" },
  languages: { label: "// Languages", color: "text-terminal-text", border: "border-terminal-gray/20", glow: "" },
};

const levelStyles = {
  expert: { label: "★★★", bar: "w-full", glow: true },
  advanced: { label: "★★", bar: "w-3/4", glow: false },
  intermediate: { label: "★", bar: "w-2/5", glow: false },
};

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const badgeRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const anims: gsap.core.Tween[] = [];
    if (containerRef.current) {
      anims.push(gsap.from(containerRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        immediateRender: false, opacity: 0, y: 20, duration: 0.5, ease: "power2.out",
      }));
    }
    const cats = categoryRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cats.length) {
      anims.push(gsap.from(cats, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        immediateRender: false, opacity: 0, y: 20, duration: 0.5, stagger: 0.12, ease: "power2.out",
      }));
    }
    const badges = badgeRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (badges.length) {
      anims.push(gsap.from(badges, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        immediateRender: false, opacity: 0, scale: 0.8, duration: 0.3, stagger: 0.02, ease: "back.out(1.7)",
      }));
    }
    return () => anims.forEach((a) => a.scrollTrigger?.kill());
  }, []);

  const categories = [...new Set(skills.map((s) => s.category))];
  let catIdx = 0;
  let badgeIdx = 0;

  return (
    <section ref={sectionRef} id="skills" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-4xl w-full">
        <p className="text-terminal-green/50 font-mono text-[10px] sm:text-xs mb-2">
          luca@portfolio:~$ cat skills.json | jq '.'
        </p>
        <h2 className="text-terminal-green font-mono text-sm mb-8 sm:mb-12 tracking-widest uppercase phosphor-glow">
          {">"} Tech Stack & Skills
        </h2>

        <div ref={containerRef} className="bg-site-surface border border-site-border rounded-lg overflow-hidden">
          <div className="flex items-center gap-0 border-b border-site-border bg-[#0e0e0e]">
            <div className="px-4 py-2 border-b-2 border-terminal-green text-terminal-green text-xs font-mono">skills.json</div>
          </div>

          <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
            {categories.map((cat) => {
              const config = categoryConfig[cat];
              const ci = catIdx++;
              return (
                <div key={cat} ref={(el) => { categoryRefs.current[ci] = el; }}>
                  <p className={`${config.color} font-mono text-[10px] sm:text-xs mb-3 sm:mb-4 opacity-60`}>{config.label}</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {skills.filter((s) => s.category === cat).map((skill) => {
                      const bi = badgeIdx++;
                      const lvl = levelStyles[skill.level];
                      return (
                        <div
                          key={skill.name}
                          ref={(el) => { badgeRefs.current[bi] = el as HTMLSpanElement; }}
                          className={`group relative font-mono text-[10px] sm:text-xs px-2 py-1 sm:px-3 sm:py-1.5 rounded-sm
                            bg-site-bg border ${config.border} ${config.color}
                            ${lvl.glow ? config.glow : ""}
                            ${skill.level === "expert" ? "font-bold" : ""}
                            hover:scale-105 transition-all duration-200 cursor-default`}
                        >
                          {skill.name}
                          {/* Level indicator — subtle dots */}
                          <span className={`ml-1.5 text-[8px] opacity-40`}>{lvl.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Legend */}
            <div className="flex gap-4 sm:gap-6 pt-2 border-t border-site-border/50">
              {(["expert", "advanced", "intermediate"] as const).map((l) => (
                <span key={l} className="text-terminal-gray/40 font-mono text-[9px] flex items-center gap-1">
                  <span className="text-[8px]">{levelStyles[l].label}</span> {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
