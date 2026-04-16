# Roadmap

## Phase 1 — Scaffold + Terminal Boot *(current)*

- [x] Init Vite + React + TypeScript
- [x] Tailwind CSS v4 + JetBrains Mono font
- [x] Zustand store (phase management)
- [x] Typewriter hook + component
- [x] Terminal boot sequence with skip
- [x] All 6 scroll sections (Hero, About, Experience, Skills, Projects, Contact)
- [x] Navbar + Footer
- [x] GSAP ScrollTrigger animations on all sections
- [x] Data files (experience, skills, projects, socials)
- [x] README

## Phase 2 — Particle Dissolve Transition

- [ ] html2canvas to capture terminal DOM
- [ ] Canvas2D particle system (~5000 particles)
- [ ] Wire transition phase in App.tsx
- [ ] Smooth dissolve animation (1.5s)

## Phase 3 — Content Polish + Animation Refinement

- [ ] Parallax background on Hero
- [ ] Split-text character reveal on About
- [ ] Fine-tune scroll animation timing
- [ ] Mobile responsive polish pass
- [ ] Add real project screenshots / thumbnails

## Phase 4 — Terminal Overlay (Easter Egg)

- [ ] TerminalOverlay component (fixed overlay)
- [ ] CommandLine with interactive input
- [ ] Command parser: about, experience, skills, projects, contact, help, clear, exit
- [ ] Backtick key listener
- [ ] Open/close animations

## Phase 5 — Backend

- [ ] Express + TypeScript server
- [ ] POST /api/contact (Zod + Resend)
- [ ] GET /api/github/stats (cached)
- [ ] Rate limiter + CORS
- [ ] Wire Contact form to backend
- [ ] Display GitHub stats in Hero/About

## Phase 6 — Polish + Deploy

- [ ] SEO meta tags + og-image
- [ ] Lighthouse audit (target 90+)
- [ ] prefers-reduced-motion support
- [ ] GitHub Actions CI
- [ ] Deploy to Vercel (frontend) + Railway (backend)
- [ ] Custom domain
- [ ] Architecture documentation
