import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { projects } from "../../data/projects";

const STATUS_STYLES: Record<string, { label: string; color: string }> = {
  live: { label: "● LIVE", color: "text-terminal-green" },
  production: { label: "● PROD", color: "text-terminal-cyan" },
  "open-source": { label: "● OSS", color: "text-terminal-amber" },
  private: { label: "● NDA", color: "text-terminal-red" },
};

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRefs = useRef<(HTMLElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const anims: gsap.core.Tween[] = [];
    const headers = headerRefs.current.filter(Boolean) as HTMLElement[];
    if (headers.length) {
      anims.push(gsap.from(headers, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        immediateRender: false, opacity: 0, y: 15, duration: 0.5, stagger: 0.1, ease: "power2.out",
      }));
    }
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length) {
      anims.push(gsap.from(cards, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        immediateRender: false, opacity: 0, y: 40, duration: 0.5, stagger: 0.1, ease: "power2.out",
      }));
    }
    return () => anims.forEach((a) => a.scrollTrigger?.kill());
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-4xl w-full">
        <p ref={(el) => { headerRefs.current[0] = el; }} className="text-terminal-green/50 font-mono text-[10px] sm:text-xs mb-2">
          luca@portfolio:~$ ls -la ./projects/
        </p>
        <h2 ref={(el) => { headerRefs.current[1] = el; }} className="text-terminal-green font-mono text-sm mb-8 sm:mb-12 tracking-widest uppercase phosphor-glow">
          {">"} Projects
        </h2>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {projects.map((project, i) => {
            const status = STATUS_STYLES[project.status];
            return (
              <div
                key={project.title}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={`group bg-site-surface rounded-lg overflow-hidden transition-all duration-300
                  hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
                  ${project.highlight
                    ? "border border-terminal-green/25 hover:border-terminal-green/50 shadow-[0_0_20px_rgba(0,255,65,0.05)]"
                    : "border border-site-border hover:border-terminal-green/30"
                  }`}
              >
                {/* Window header */}
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#0e0e0e] border-b border-site-border">
                  <div className="w-2 h-2 rounded-full bg-terminal-red/60" />
                  <div className="w-2 h-2 rounded-full bg-terminal-amber/60" />
                  <div className="w-2 h-2 rounded-full bg-terminal-green/60" />
                  <span className="ml-2 text-terminal-gray text-[10px] font-mono truncate">
                    project_{String(i).padStart(2, "0")}.md
                  </span>
                  <span className={`ml-auto text-[9px] font-mono shrink-0 ${status.color}`}>
                    {status.label}
                  </span>
                </div>

                <div className="p-4 sm:p-5">
                  {/* Title */}
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-terminal-green/50 text-xs font-mono mt-0.5 shrink-0">$</span>
                    <h3 className="text-site-text font-bold text-base sm:text-lg font-mono group-hover:text-terminal-green transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-site-text-dim text-[11px] sm:text-sm font-mono mb-3 leading-relaxed pl-5">
                    {project.longDescription}
                  </p>

                  {/* Metrics */}
                  {project.metrics && (
                    <div className="pl-5 mb-3 space-y-1">
                      {project.metrics.map((m) => (
                        <div key={m} className="flex items-center gap-2">
                          <span className="text-terminal-green text-[10px]">▸</span>
                          <span className="text-site-text/70 text-[10px] sm:text-xs font-mono">{m}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="pl-5 mb-3 flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-mono px-1.5 py-0.5 rounded-sm bg-terminal-green/5 text-terminal-green/50 border border-terminal-green/10">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pl-5">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                         className="text-terminal-green/60 text-xs font-mono hover:text-terminal-green transition-colors font-bold">
                        {">"} GitHub
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer"
                         className="text-terminal-cyan/60 text-xs font-mono hover:text-terminal-cyan transition-colors font-bold">
                        {">"} Live Demo
                      </a>
                    )}
                    {project.status === "private" && (
                      <span className="text-terminal-red/40 text-xs font-mono">{">"} Confidential</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
