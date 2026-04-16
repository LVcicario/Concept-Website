import { useEffect, useRef, useState, type FormEvent } from "react";
import { gsap } from "../../lib/gsap";
import { socials } from "../../data/socials";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const elRefs = useRef<(HTMLElement | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);
  let elIdx = 0;

  useEffect(() => {
    const els = elRefs.current.filter(Boolean) as HTMLElement[];
    const anims: gsap.core.Tween[] = [];

    if (els.length) {
      anims.push(gsap.from(els, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        immediateRender: false,
        opacity: 0, y: 20, duration: 0.4, stagger: 0.08, ease: "power2.out",
      }));
    }

    return () => anims.forEach((a) => a.scrollTrigger?.kill());
  }, []);

  const setEl = (el: HTMLElement | null) => { elRefs.current[elIdx++] = el; };
  elIdx = 0;

  const handleSubmit = (e: FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <section ref={sectionRef} id="contact" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-2xl w-full">
        <p ref={setEl} className="text-terminal-green/50 font-mono text-[10px] sm:text-xs mb-2">
          luca@portfolio:~$ ./send_message.sh
        </p>
        <h2 ref={setEl} className="text-terminal-green font-mono text-sm mb-8 tracking-widest uppercase phosphor-glow">
          {">"} Establish Connection
        </h2>

        {submitted ? (
          <div ref={setEl} className="bg-site-surface border border-terminal-green/30 rounded-lg p-6 sm:p-8 text-center">
            <div className="text-terminal-green phosphor-glow font-mono text-xs sm:text-sm mb-4 space-y-1">
              <p>{">"} MESSAGE TRANSMITTED</p>
              <p>{">"} STATUS: 200 OK</p>
            </div>
            <p className="text-site-text-dim text-[10px] sm:text-xs font-mono">Connection established. Response incoming.</p>
          </div>
        ) : (
          <div ref={setEl} className="bg-site-surface border border-site-border rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#0e0e0e] border-b border-site-border">
              <div className="w-2 h-2 rounded-full bg-terminal-red/60" />
              <div className="w-2 h-2 rounded-full bg-terminal-amber/60" />
              <div className="w-2 h-2 rounded-full bg-terminal-green/60" />
              <span className="ml-2 text-terminal-gray text-[10px] font-mono">send_message.sh</span>
            </div>
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-terminal-gray font-mono text-[10px] uppercase tracking-wider mb-1.5">Sender_Name</label>
                <div className="flex items-center gap-2">
                  <span className="text-terminal-green/50 text-sm font-mono">$</span>
                  <input type="text" required placeholder="John Doe" className="flex-1 bg-terminal-bg border border-site-border rounded px-3 py-2 text-terminal-green font-mono text-sm placeholder:text-terminal-gray/30 focus:outline-none focus:border-terminal-green/40 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-terminal-gray font-mono text-[10px] uppercase tracking-wider mb-1.5">Reply_Address</label>
                <div className="flex items-center gap-2">
                  <span className="text-terminal-green/50 text-sm font-mono">$</span>
                  <input type="email" required placeholder="john@company.com" className="flex-1 bg-terminal-bg border border-site-border rounded px-3 py-2 text-terminal-green font-mono text-sm placeholder:text-terminal-gray/30 focus:outline-none focus:border-terminal-green/40 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-terminal-gray font-mono text-[10px] uppercase tracking-wider mb-1.5">Message_Body</label>
                <div className="flex items-start gap-2">
                  <span className="text-terminal-green/50 text-sm font-mono mt-2">$</span>
                  <textarea required rows={5} placeholder="Your message here..." className="flex-1 bg-terminal-bg border border-site-border rounded px-3 py-2 text-terminal-green font-mono text-sm resize-none placeholder:text-terminal-gray/30 focus:outline-none focus:border-terminal-green/40 transition-colors" />
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-terminal-green/10 border border-terminal-green/40 text-terminal-green font-mono text-sm rounded hover:bg-terminal-green hover:text-terminal-bg transition-all duration-300 cursor-pointer phosphor-glow">
                {">"} TRANSMIT MESSAGE
              </button>
            </form>
          </div>
        )}

        <div ref={setEl} className="flex justify-center gap-6 sm:gap-8 mt-10">
          {socials.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="group text-center">
              <span className="text-terminal-gray font-mono text-xs group-hover:text-terminal-green transition-colors">[{s.name}]</span>
            </a>
          ))}
        </div>

        <p ref={setEl} className="text-center text-terminal-gray/30 font-mono text-[10px] mt-8">
          EOF — lucavicario1904@gmail.com — +33 6 30 34 00 18
        </p>
      </div>
    </section>
  );
}
