import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

const ASCII_NAME_FULL = `
 ██╗     ██╗   ██╗ ██████╗ █████╗
 ██║     ██║   ██║██╔════╝██╔══██╗
 ██║     ██║   ██║██║     ███████║
 ██║     ██║   ██║██║     ██╔══██║
 ███████╗╚██████╔╝╚██████╗██║  ██║
 ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝
                        VICARIO`;

const ASCII_NAME_MOBILE = `
 █╗   █╗  █╗ █████╗
 █║   █║  █║██╔═══╝
 █║   █║  █║██║
 █║   █║  █║██║
 ████╗╚████╔╝╚████╗
 ╚═══╝ ╚═══╝  ╚═══╝
         VICARIO`;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const asciiRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation (plays once on load)
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(asciiRef.current, { opacity: 0, y: -20, duration: 0.6, ease: "power2.out" })
        .from(".hero-line", { opacity: 0, x: -30, stagger: 0.15, duration: 0.5, ease: "power2.out" }, "-=0.2")
        .from(".hero-stat", { opacity: 0, y: 20, stagger: 0.1, duration: 0.4, ease: "back.out(1.7)" }, "-=0.3")
        .from(ctaRef.current, { opacity: 0, y: 15, duration: 0.4, ease: "power2.out" }, "-=0.1");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,65,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 text-center w-full max-w-4xl">
        <p className="text-terminal-green/60 font-mono text-[10px] sm:text-xs mb-4 sm:mb-6 tracking-widest">
          luca@portfolio:~$ cat identity.txt
        </p>

        <div ref={asciiRef} className="mb-6 sm:mb-8">
          <pre className="sm:hidden text-terminal-green phosphor-glow text-[9px] leading-tight whitespace-pre font-mono inline-block text-left">
            {ASCII_NAME_MOBILE}
          </pre>
          <pre className="hidden sm:inline-block text-terminal-green phosphor-glow sm:text-[10px] md:text-xs leading-tight whitespace-pre font-mono text-left">
            {ASCII_NAME_FULL}
          </pre>
        </div>

        <div className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8 text-center px-1">
          <p className="hero-line text-site-text font-mono text-xs sm:text-sm md:text-base">
            <span className="text-terminal-green">$</span> role=
            <span className="text-terminal-cyan">"Software Engineer & AI Builder"</span>
          </p>
          <p className="hero-line text-site-text-dim font-mono text-[11px] sm:text-xs md:text-sm">
            <span className="text-terminal-green">$</span> location="Lyon, FR" status=
            <span className="text-terminal-green">"available"</span>
          </p>
          <p className="hero-line text-site-text-dim font-mono text-[11px] sm:text-xs md:text-sm">
            <span className="text-terminal-green">$</span> stack=["
            <span className="text-terminal-amber">TS</span>","
            <span className="text-terminal-amber">React</span>","
            <span className="text-terminal-amber">Node</span>","
            <span className="text-terminal-amber">AI</span>"]
          </p>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:justify-center gap-4 sm:gap-10 mb-8 sm:mb-10">
          {[
            { value: "5+", label: "Years Coding" },
            { value: "110", label: "People Led" },
            { value: "1", label: "AI SaaS Built" },
            { value: "ABB", label: "Global Corp XP" },
          ].map((stat) => (
            <div key={stat.label} className="hero-stat text-center">
              <div className="text-terminal-green phosphor-glow text-xl sm:text-2xl md:text-3xl font-bold font-mono">
                {stat.value}
              </div>
              <div className="text-terminal-gray text-[9px] sm:text-[10px] md:text-xs font-mono mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <a
            href="#projects"
            className="group px-5 py-2.5 sm:px-6 sm:py-3 bg-terminal-green/10 border border-terminal-green/50 text-terminal-green
                       font-mono text-xs sm:text-sm rounded hover:bg-terminal-green hover:text-terminal-bg transition-all duration-300 text-center"
          >
            <span className="text-terminal-green/60 group-hover:text-terminal-bg/60">$</span> view_projects
          </a>
          <a
            href="#contact"
            className="group px-5 py-2.5 sm:px-6 sm:py-3 border border-site-border text-site-text-dim
                       font-mono text-xs sm:text-sm rounded hover:border-terminal-green/50 hover:text-terminal-green transition-all duration-300 text-center"
          >
            <span className="text-terminal-gray group-hover:text-terminal-green/60">$</span> contact --init
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-terminal-gray/50 text-[9px] sm:text-[10px] font-mono">SCROLL</span>
        <div className="w-px h-8 sm:h-10 bg-gradient-to-b from-terminal-green/30 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
