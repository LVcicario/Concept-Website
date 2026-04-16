import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  let lineIdx = 0;
  let cardIdx = 0;

  useEffect(() => {
    const lines = lineRefs.current.filter(Boolean) as HTMLElement[];
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    const anims: gsap.core.Tween[] = [];

    if (lines.length) {
      anims.push(gsap.from(lines, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        immediateRender: false,
        opacity: 0, x: -15, duration: 0.35, stagger: 0.06, ease: "power2.out",
      }));
    }
    if (cards.length) {
      anims.push(gsap.from(cards, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        immediateRender: false,
        opacity: 0, x: 20, duration: 0.5, stagger: 0.12, ease: "power2.out",
      }));
    }

    return () => anims.forEach((a) => a.scrollTrigger?.kill());
  }, []);

  const setLine = (el: HTMLElement | null) => { lineRefs.current[lineIdx++] = el; };
  const setCard = (el: HTMLElement | null) => { cardRefs.current[cardIdx++] = el; };

  // Reset indices on each render
  lineIdx = 0;
  cardIdx = 0;

  return (
    <section ref={sectionRef} id="about" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-5xl w-full">
        <p ref={setLine} className="text-terminal-green/50 font-mono text-[10px] sm:text-xs mb-4 sm:mb-6 truncate">
          luca@portfolio:~$ cat ./about/README.md
        </p>

        <div className="grid md:grid-cols-[1fr_280px] gap-6 sm:gap-8">
          <div ref={setLine} className="bg-site-surface border border-site-border rounded-lg overflow-hidden">
            <div className="flex items-center gap-0 border-b border-site-border bg-[#0e0e0e]">
              <div className="px-4 py-2 border-b-2 border-terminal-green text-terminal-green text-xs font-mono">README.md</div>
              <div className="px-4 py-2 text-terminal-gray text-xs font-mono">config.json</div>
            </div>
            <div className="p-3 sm:p-4 md:p-6 font-mono text-[11px] sm:text-xs md:text-sm">
              <div className="flex gap-2 sm:gap-4">
                <div className="hidden sm:block text-terminal-gray/30 text-right select-none leading-relaxed min-w-[2ch]">
                  {Array.from({ length: 18 }, (_, i) => <div key={i}>{i + 1}</div>)}
                </div>
                <div className="leading-relaxed flex-1 min-w-0">
                  <div className="text-terminal-amber font-bold text-base sm:text-lg"># About Me</div>
                  <div className="h-[1.5em]" />
                  <div className="text-site-text">Full-stack software engineer and <span className="text-terminal-cyan">AI product builder</span> based in Lyon, France.</div>
                  <div className="text-site-text-dim">I build things at the intersection of <span className="text-terminal-green">technology</span>, <span className="text-terminal-cyan">business</span>, and <span className="text-terminal-amber">human impact</span>.</div>
                  <div className="h-[1.5em]" />
                  <div className="text-terminal-amber">## Current</div>
                  <div className="text-site-text">Founding <span className="text-terminal-green font-bold">Nexalis.ai</span> — shipping AI-powered SaaS tools from</div>
                  <div className="text-site-text">architecture to market. TypeScript, Node.js, Supabase.</div>
                  <div className="h-[1.5em]" />
                  <div className="text-terminal-amber">## Previously</div>
                  <div className="text-site-text">AI Expert at <span className="text-terminal-cyan font-bold">ABB</span> — edge AI on Raspberry Pi,</div>
                  <div className="text-site-text">custom AI modules for a $30B industrial tech group. R&D under NDA.</div>
                  <div className="h-[1.5em]" />
                  <div className="text-terminal-amber">## The Plot Twist</div>
                  <div className="text-site-text">Before tech, I directed a <span className="text-terminal-amber font-bold">110-person retail operation</span>.</div>
                  <div className="text-site-text-dim">P&L, recruitment, high-pressure daily ops. That's where I</div>
                  <div className="text-site-text-dim">learned systems thinking, people, and execution under fire.</div>
                  <div className="h-[1.5em]" />
                  <div className="text-terminal-gray">{`<!-- Master's in Digital Business — Epitech Digital Lyon (2021-2026) -->`}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Clearance Level — FIRST, most impressive */}
            <div ref={setCard} className="bg-site-surface border border-terminal-amber/30 rounded-lg p-4 shadow-[0_0_15px_rgba(255,184,0,0.05)]">
              <div className="text-terminal-amber text-[10px] font-mono uppercase tracking-wider mb-3 font-bold">☆ Clearance Level</div>
              <p className="text-site-text text-xs font-mono leading-relaxed">
                Member of <span className="text-terminal-amber font-bold">CSI</span> — Cercle de Stratégies et d'Influences.
              </p>
              <p className="text-site-text-dim text-[11px] font-mono leading-relaxed mt-1">
                Restricted French strategic think tank — senior executives, political figures, institutional leaders.
              </p>
              <div className="mt-3 pt-3 border-t border-terminal-amber/15">
                <p className="text-site-text text-xs font-mono leading-relaxed">
                  Official credential from the <span className="text-terminal-amber font-bold">Cabinet du Président de la République</span>.
                </p>
                <p className="text-site-text-dim text-[10px] font-mono mt-1">
                  Participated in restricted institutional exchanges at the highest level of the French state.
                </p>
              </div>
            </div>

            <div ref={setCard} className="bg-site-surface border border-site-border rounded-lg p-4">
              <div className="text-terminal-gray text-[10px] font-mono uppercase tracking-wider mb-3">System Status</div>
              {[
                { key: "status", val: "active", color: "text-terminal-green" },
                { key: "role", val: "founder / dev", color: "text-terminal-cyan" },
                { key: "base", val: "Lyon, FR", color: "text-site-text" },
                { key: "edu", val: "Epitech Digital", color: "text-site-text" },
              ].map((item) => (
                <div key={item.key} className="flex justify-between items-center py-1.5 border-b border-site-border/50 last:border-0">
                  <span className="text-terminal-gray text-xs font-mono">{item.key}:</span>
                  <span className={`${item.color} text-xs font-mono`}>{item.val}</span>
                </div>
              ))}
            </div>
            <div ref={setCard} className="bg-site-surface border border-site-border rounded-lg p-4">
              <div className="text-terminal-gray text-[10px] font-mono uppercase tracking-wider mb-3">Languages</div>
              {[
                { lang: "French", level: "native", pct: "100%" },
                { lang: "English", level: "fluent", pct: "90%" },
                { lang: "Chinese", level: "init", pct: "15%" },
              ].map((l) => (
                <div key={l.lang} className="mb-2 last:mb-0">
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-site-text">{l.lang}</span>
                    <span className="text-terminal-gray">{l.level}</span>
                  </div>
                  <div className="h-1 bg-site-border rounded-full overflow-hidden">
                    <div className="h-full bg-terminal-green/60 rounded-full" style={{ width: l.pct }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
