<div align="center">

```
██╗     ██╗   ██╗ ██████╗ █████╗    ██╗   ██╗██╗ ██████╗ █████╗ ██████╗ ██╗ ██████╗ 
██║     ██║   ██║██╔════╝██╔══██╗   ██║   ██║██║██╔════╝██╔══██╗██╔══██╗██║██╔═══██╗
██║     ██║   ██║██║     ███████║   ██║   ██║██║██║     ███████║██████╔╝██║██║   ██║
██║     ██║   ██║██║     ██╔══██║   ╚██╗ ██╔╝██║██║     ██╔══██║██╔══██╗██║██║   ██║
███████╗╚██████╔╝╚██████╗██║  ██║    ╚████╔╝ ██║╚██████╗██║  ██║██║  ██║██║╚██████╔╝
╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝     ╚═══╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ 
```

**PORTFOLIO N°1 — COLD WAR EDITION**

*A period as fascinating as it is terrifying.*

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?logo=greensock&logoColor=white)](https://gsap.com)
[![D3-Geo](https://img.shields.io/badge/D3--Geo-Natural%20Earth-F9A03C?logo=d3dotjs&logoColor=white)](https://d3js.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Web Audio](https://img.shields.io/badge/Web%20Audio-API-FF6B6B)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

</div>

---

## The Story

> *September 26, 1983. Lieutenant Colonel Stanislav Petrov sits in a bunker outside Moscow. The Soviet early warning system screams — five American ICBMs are inbound. He has minutes to decide. Launch a counterstrike, or trust his instinct that the system is wrong. He chooses not to fire. The system was wrong. The world survives.*

This portfolio is built in the spirit of that era — when the world ran on terminal screens, green phosphor monitors, and systems that could end civilization with a keystroke.

It is the **first in a series of thematic portfolios**, each exploring a different chapter of technology history. This one is dedicated to the Cold War: the paranoia, the engineering, the impossible tension of Mutually Assured Destruction — and the humans who prevented it.

---

## What You'll Experience

This isn't a traditional portfolio. It's an **interactive narrative**.

**1. The Terminal**
You arrive at a blank screen. A blinking cursor. You must type `./start` to initialize the system — just like the operators at NORAD, SAGE, and the Soviet Oko early warning stations did every day, knowing that the next command could be the last.

**2. The Boot Sequence**
The system initializes. Soviet-era typing sounds. CRT scanlines. A phosphor glow. Each line loads a module — my skills, my career, my projects. The machine becomes a window into who I am.

**3. The Classified Transition**
A KGB document appears. Classification stamps slam down — СЕКРЕТНО. ЗАПРЕЩЕНО. The screen distorts into VHS static. A signal is lost. The terminal era ends.

**4. The Portfolio**
Cinematic scroll sections reveal themselves as you navigate — as if the code is being written in real-time before your eyes. Each section is a terminal window. The Matrix rain falls in the background. A dark synth drone hums beneath it all.

**5. The Simulation**
At the bottom of the page, a button waits.

☭ **ПУСК** ☭

Press it, and witness a full-scale global thermonuclear war simulation. 300 warheads. Real-world targets based on 1983 NATO vs. Warsaw Pact doctrine. A real map. Real city names. A real casualty counter.

It is not entertainment. It is a reminder.

> *"The only winning move is not to play."*
> — WarGames (1983)

---

## Technical Showcase

This project demonstrates full-stack frontend engineering through the lens of Cold War computing:

| Capability | Implementation |
|---|---|
| **Interactive CLI** | Custom terminal emulator with command parser, typewriter effect, 5 keystroke sound variants |
| **Audio Engine** | 15+ synthesized sounds via Web Audio API — no audio files. Soviet teletype clicks, CRT hum, nuclear sirens, radar beeps, impact explosions |
| **CRT Simulation** | Scanlines, phosphor glow, screen curvature, flicker, power-on/off animations — all CSS |
| **Cartography** | D3-Geo with Natural Earth 50m TopoJSON projection. Real-world Mercator coordinates for 300 strike targets |
| **Canvas Animation** | 60fps missile trajectory rendering, parabolic ICBM arcs, shockwave physics, mushroom cloud gradients |
| **Scroll Cinematics** | GSAP ScrollTrigger with staggered reveals, section typewriter effects, parallax layers |
| **State Architecture** | Zustand stores for app phase, easter eggs (localStorage persisted), mute state |
| **Sound Design** | Dark Cm7 synth drone (4 oscillators + LFO), Soviet 50Hz mains hum, 3-layer nuclear siren |
| **Responsive** | Mobile-first design, touch-optimized, performance-throttled canvas on low-end devices |

### Architecture

```
client/src/
├── components/
│   ├── terminal/          ← Interactive CLI, boot sequence, CRT effects
│   ├── transition/        ← Soviet classified document transition
│   ├── sections/          ← Hero, About, Experience, Skills, Projects, Contact
│   ├── nuclear/           ← War simulation (map, missiles, aftermath)
│   └── layout/            ← Navbar, footer, matrix rain, section dividers
├── hooks/                 ← Typewriter, Konami code, scroll triggers
├── lib/                   ← Web Audio engine, GSAP setup, terminal commands
├── stores/                ← Zustand (app state, easter eggs)
└── data/                  ← Career data, skills, projects, 300 nuclear strikes
```

---

## The Hidden Layer

There are **3 easter eggs** hidden in the site. A counter in the navbar tracks your progress: `[0/3]`.

I won't tell you what they are. But I'll tell you this: the answers are scattered across the site, the browser console, and the page source.

And if you're reading this on GitHub... you may have noticed a folder called `.classified/`.

Six intelligence documents. Six agencies. All concerning the same operative.

```
$ cat .classified/OPERATION_PHOENIX_002.enc | base64 -d
```

Not all files tell the truth. Not all agencies agree.

---

## The Simulation — A Warning

The nuclear war simulation at the end of this site is not a game. It is modeled on real 1983 Cold War doctrine:

- **NATO vs. Warsaw Pact** targeting — only historically accurate belligerents
- **Real warhead types** — W-87, R-36M, SS-20, Polaris A3, DF-5
- **Real launch sites** — Malmstrom AFB, Dombarovsky, Holy Loch, Île Longue
- **Real cities** — with approximate casualty estimates
- **The final strike (#300)** hits Lyon, France. My city.

The world came within minutes of this scenario — not once, but [multiple times](https://en.wikipedia.org/wiki/List_of_nuclear_close_calls). Petrov in 1983. Arkhipov in 1962. Able Archer 83.

This simulation exists because the people who lived through the Cold War are aging, and their stories are fading. The generation that builds AI — my generation — must understand what unchecked technological escalation looks like.

**We build. We don't destroy.**

---

## Run Locally

```bash
git clone https://github.com/LVcicario/Concept-Website.git
cd Concept-Website/client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Use headphones for the full experience.

---

## What's Next

This is **Portfolio N°1**. Each edition will explore a different era of computing:

| # | Theme | Status |
|---|---|---|
| 1 | **Cold War** — Terminals, espionage, nuclear deterrence | ✅ Current |
| 2 | *Cyberpunk* — Neon, hacking, neural interfaces | 🔜 Coming |
| 3 | *Space Age* — NASA, Apollo, mission control | 📋 Planned |
| 4 | *[REDACTED]* | ██████ |

---

## About Me

**Luca Vicario** — Software Engineer & AI Product Builder

Founder of [Nexalis.ai](https://nexalis.ai). Former AI Expert at ABB. Former director of a 110-person operation. Member of CSI (Cercle de Stratégies et d'Influences). Currently completing a Master's in Digital Business at Epitech Digital Lyon.

I build things at the intersection of technology, business, and human impact.

[LinkedIn](https://www.linkedin.com/in/luca-vicario) · [GitHub](https://github.com/LVcicario) · [Email](mailto:lucavicario1904@gmail.com)

---

<div align="center">

```
═══════════════════════════════════════════════
  TERMINAL SESSION CLOSED
  NORAD-7734 — SIGNING OFF
═══════════════════════════════════════════════
```

*Built with React, TypeScript, GSAP, D3-Geo, Web Audio API, and a deep respect for history.*

**MIT License**

</div>
