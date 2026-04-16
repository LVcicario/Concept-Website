import { useState } from "react";
import { useEasterEggStore } from "../../stores/easterEggStore";

const NAV_ITEMS = [
  { label: "about", href: "#about" },
  { label: "experience", href: "#experience" },
  { label: "skills", href: "#skills" },
  { label: "projects", href: "#projects" },
  { label: "contact", href: "#contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const found = useEasterEggStore((s) => s.found);
  const count = found.length;

  const badgeClass = count >= 3
    ? "text-terminal-amber border-terminal-amber/40 bg-terminal-amber/10"
    : "text-terminal-green/50 border-terminal-green/20 bg-terminal-green/5";

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-terminal-bg/90 backdrop-blur-md border-b border-terminal-green/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
        <a
          href="#hero"
          className="text-terminal-green font-mono text-xs phosphor-glow flex items-center gap-1.5"
        >
          <span className="text-terminal-green/50">$</span>
          <span className="font-bold">luca_vicario</span>
          <span className="inline-block w-1.5 h-3 bg-terminal-green/80 terminal-cursor" />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-terminal-gray font-mono text-[11px] px-3 py-1.5 rounded
                         hover:text-terminal-green hover:bg-terminal-green/5 transition-all duration-200"
            >
              ./{item.label}
            </a>
          ))}
          <span className={`ml-3 font-mono text-[10px] px-2 py-0.5 rounded border ${badgeClass}`}>
            [{count}/3]{count >= 3 && " ★"}
          </span>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border ${badgeClass}`}>
            [{count}/3]{count >= 3 && " ★"}
          </span>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-terminal-green font-mono text-xs cursor-pointer
                       border border-terminal-green/20 px-2 py-1 rounded hover:bg-terminal-green/5"
          >
            {menuOpen ? "$ exit" : "$ menu"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-terminal-bg/95 border-b border-terminal-green/10 px-6 py-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block text-terminal-gray font-mono text-sm py-2 hover:text-terminal-green transition-colors"
            >
              <span className="text-terminal-green/40">$</span> cd ./{item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
