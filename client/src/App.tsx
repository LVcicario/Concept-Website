import { useEffect, useCallback, useState } from "react";
import { useAppStore } from "./stores/appStore";
import { useEasterEggStore } from "./stores/easterEggStore";
import { useKonamiCode } from "./hooks/useKonamiCode";
import { TerminalBoot } from "./components/terminal/TerminalBoot";
import { ParticleDissolve } from "./components/transition/ParticleDissolve";
import { TerminalOverlay } from "./components/terminal/TerminalOverlay";
import { NuclearSequence } from "./components/nuclear/NuclearSequence";
import { MatrixRain } from "./components/layout/MatrixRain";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { SectionDivider } from "./components/layout/SectionDivider";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Experience } from "./components/sections/Experience";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { Contact } from "./components/sections/Contact";
import { printConsoleEasterEgg } from "./lib/consoleEasterEgg";
import { playSuccessChime } from "./lib/audio";
import {
  startSiteAmbient,
  setSiteAmbientMuted,
  resumeAudio,
} from "./lib/audio";

function App() {
  const phase = useAppStore((s) => s.phase);
  const setPhase = useAppStore((s) => s.setPhase);
  const muted = useAppStore((s) => s.muted);
  const toggleMute = useAppStore((s) => s.toggleMute);
  const terminalOpen = useAppStore((s) => s.terminalOverlayOpen);

  const eggFound = useEasterEggStore((s) => s.found);
  const discover = useEasterEggStore((s) => s.discover);
  const nuclearTriggered = useEasterEggStore((s) => s.nuclearTriggered);
  const nuclearDone = useEasterEggStore((s) => s.nuclearDone);
  const setNuclearTriggered = useEasterEggStore((s) => s.setNuclearTriggered);

  // Konami glitch state
  const [konamiGlitch, setKonamiGlitch] = useState(false);

  // Reset easter egg state on dev (remove for production)
  useEffect(() => {
    printConsoleEasterEgg();
    // DEV: clear stale localStorage on each load to prevent stuck states
    if (import.meta.env.DEV) {
      localStorage.removeItem("lv_eggs");
      localStorage.removeItem("lv_nuclear_done");
    }
  }, []);

  // Start ambient on site phase
  useEffect(() => {
    if (phase === "site") {
      resumeAudio();
      startSiteAmbient();

      // Fallback: also try on first user interaction in case AudioContext was suspended
      const retryAudio = () => {
        resumeAudio();
        startSiteAmbient();
      };
      window.addEventListener("click", retryAudio, { once: true });
      window.addEventListener("scroll", retryAudio, { once: true });
      return () => {
        window.removeEventListener("click", retryAudio);
        window.removeEventListener("scroll", retryAudio);
      };
    }
  }, [phase]);

  // Sync mute
  useEffect(() => {
    setSiteAmbientMuted(muted);
  }, [muted]);

  // Konami code — Easter egg 1
  const handleKonami = useCallback(() => {
    if (eggFound.includes("konami")) return;
    playSuccessChime();
    discover("konami");
    setKonamiGlitch(true);
    setTimeout(() => setKonamiGlitch(false), 1500);
  }, [eggFound, discover]);
  useKonamiCode(handleKonami);

  // Backtick → terminal overlay
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "`" && phase === "site" && !nuclearTriggered) {
        e.preventDefault();
        useAppStore.getState().toggleTerminalOverlay();
      }
      if (e.key === "Escape" && terminalOpen) {
        useAppStore.getState().closeTerminalOverlay();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [phase, nuclearTriggered, terminalOpen]);

  // Track if eggs were already loaded from storage on mount (don't auto-trigger)
  const [initialEggCount] = useState(() => eggFound.length);

  // Trigger nuclear only when a NEW egg is discovered that completes the set
  useEffect(() => {
    if (eggFound.length === 3 && eggFound.length > initialEggCount && !nuclearTriggered && !nuclearDone) {
      useAppStore.getState().closeTerminalOverlay();
      const timer = setTimeout(() => {
        setNuclearTriggered();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [eggFound, nuclearTriggered, nuclearDone, setNuclearTriggered]);

  if (phase === "boot") {
    return <TerminalBoot onComplete={() => setPhase("transition")} />;
  }

  if (phase === "transition") {
    return <ParticleDissolve onComplete={() => setPhase("site")} />;
  }

  return (
    <>
      {/* Nuclear sequence overlay */}
      {nuclearTriggered && <NuclearSequence />}

      {/* Konami glitch overlay */}
      {konamiGlitch && (
        <div className="fixed inset-0 z-[90] pointer-events-none">
          <div className="w-full h-full bg-terminal-green/10 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-terminal-green phosphor-glow font-mono text-xl sm:text-3xl font-bold animate-pulse text-center px-4">
              ACCESS GRANTED
              <div className="text-sm sm:text-base text-terminal-green/60 mt-2">
                ★ Easter egg 1/3 discovered
              </div>
            </div>
          </div>
        </div>
      )}

      <MatrixRain />
      <div className="fixed inset-0 z-[1] pointer-events-none crt-scanlines opacity-30" />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <SectionDivider command="cd ./about" />
          <About />
          <SectionDivider command="git log --career" />
          <Experience />
          <SectionDivider command="cat skills.json" />
          <Skills />
          <SectionDivider command="ls ./projects" />
          <Projects />
          <SectionDivider command="./contact.sh" />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Terminal overlay */}
      <TerminalOverlay />

      {/* Mute button */}
      <button
        onClick={() => { resumeAudio(); toggleMute(); }}
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 text-terminal-gray text-[10px] sm:text-xs font-mono
                   border border-terminal-gray/20 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded
                   hover:text-terminal-green hover:border-terminal-green/30 transition-colors cursor-pointer
                   bg-terminal-bg/80 backdrop-blur-sm"
      >
        {muted ? "[sound: off]" : "[sound: on]"}
      </button>
    </>
  );
}

export default App;
