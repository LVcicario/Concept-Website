export interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  highlight?: boolean;
}

export const projects: Project[] = [
  {
    title: "Nexalis.ai",
    description:
      "AI-powered SaaS platform built from scratch. Full product lifecycle — architecture, UI/UX, backend, AI integration, deployment, and go-to-market strategy.",
    tags: ["TypeScript", "React", "Node.js", "Supabase", "AI", "SaaS"],
    live: "https://nexalis.ai",
    highlight: true,
  },
  {
    title: "AI Automation Suite @ ABB",
    description:
      "Contributed to internal AI and automation tools within a Fortune 500 industrial tech group. Cross-functional data-driven projects under NDA.",
    tags: ["AI", "Automation", "Python", "Data", "Enterprise"],
    highlight: true,
  },
  {
    title: "Terminal Portfolio",
    description:
      "This website — a cinematic terminal boot sequence transitioning into a scroll experience. CRT effects, Web Audio API sounds, Matrix rain, GSAP animations.",
    tags: ["React", "GSAP", "TypeScript", "Web Audio API", "Canvas2D"],
    github: "https://github.com/LVcicario/Concept-Website",
  },
  {
    title: "Real-Time Dashboard",
    description:
      "Full-stack dashboard with live data feeds, WebSocket updates, interactive charts, and role-based authentication.",
    tags: ["Next.js", "WebSockets", "PostgreSQL", "Charts", "Auth"],
  },
  {
    title: "RAG Knowledge Base",
    description:
      "Retrieval-Augmented Generation system — document ingestion pipeline, vector embeddings, semantic search, and conversational AI interface.",
    tags: ["LLM", "RAG", "Embeddings", "Python", "Supabase"],
  },
  {
    title: "SaaS Boilerplate",
    description:
      "Production-ready SaaS starter with auth, billing, multi-tenancy, admin panel, and CI/CD. Open-source foundation for Nexalis projects.",
    tags: ["TypeScript", "Next.js", "Stripe", "Supabase", "Docker"],
    github: "https://github.com/LVcicario",
  },
];
