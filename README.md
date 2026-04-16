# Terminal Cinematic Portfolio

A portfolio website that boots like a terminal, then transitions into a cinematic scroll experience.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?logo=greensock&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)

## Concept

The site opens as a **full-screen terminal** that auto-types a boot sequence. After the sequence completes, the terminal dissolves into particles, revealing a **cinematic scroll storytelling** experience with parallax animations and scroll-triggered reveals.

An **easter egg** (backtick key) reopens the terminal as an overlay at any time, letting users navigate via CLI commands.

### Flow

```
Terminal Boot → Particle Dissolve → Cinematic Scroll Site
     ↑                                      │
     └──────── Easter Egg (` key) ──────────┘
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + TypeScript + Vite |
| Styling | Tailwind CSS v4 |
| Animations | GSAP + ScrollTrigger |
| State | Zustand |
| Font | JetBrains Mono (self-hosted) |
| Backend | Express + TypeScript (coming) |

## Getting Started

```bash
# Clone
git clone https://github.com/LVcicario/Concept-Website.git
cd Concept-Website/client

# Install
npm install

# Dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
client/src/
├── App.tsx                    # Phase router (boot → transition → site)
├── stores/appStore.ts         # Zustand store (phase, terminal overlay)
├── components/
│   ├── terminal/              # Boot sequence, typewriter, CLI overlay
│   ├── transition/            # Particle dissolve (Phase 2)
│   ├── sections/              # Hero, About, Experience, Skills, Projects, Contact
│   └── layout/                # Navbar, Footer
├── hooks/                     # useTypewriter, useTerminal, etc.
├── lib/                       # GSAP setup, API client, commands
└── data/                      # Content data (experience, skills, projects)
```

## Roadmap

See [ROADMAP.md](./ROADMAP.md) for the full implementation plan.

- [x] Phase 1 — Scaffold + Terminal Boot
- [ ] Phase 2 — Particle Dissolve Transition
- [ ] Phase 3 — Section Animations + Content
- [ ] Phase 4 — Terminal Overlay Easter Egg
- [ ] Phase 5 — Backend (Contact + GitHub Stats)
- [ ] Phase 6 — Polish + Deploy

## License

MIT
