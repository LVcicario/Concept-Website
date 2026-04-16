export interface Project {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  github?: string;
  live?: string;
  highlight?: boolean;
  metrics?: string[];
  status: "live" | "production" | "private" | "open-source";
}

export const projects: Project[] = [
  {
    title: "Nexalis.ai",
    description: "AI-powered SaaS platform — from zero to production.",
    longDescription:
      "Full-stack AI SaaS built from scratch. Designed the architecture, built the UI/UX, integrated LLM APIs, deployed the backend, and launched the go-to-market strategy. Multi-tenant, real-time, with AI-powered automation workflows.",
    tags: ["TypeScript", "React", "Node.js", "Supabase", "OpenAI", "Stripe"],
    live: "https://nexalis.ai",
    highlight: true,
    metrics: ["Full product lifecycle", "AI automation workflows", "Multi-tenant architecture"],
    status: "live",
  },
  {
    title: "AI Automation Suite — ABB",
    description: "Edge AI & custom modules for a $30B industrial group.",
    longDescription:
      "Designed and deployed AI modules on Raspberry Pi for edge computing at ABB, a Fortune 500 industrial technology leader. Created custom AI models for industrial automation, IoT data processing, and predictive systems. Confidential R&D projects.",
    tags: ["Python", "AI/ML", "Raspberry Pi", "Edge Computing", "IoT", "R&D"],
    highlight: true,
    metrics: ["Edge AI on Raspberry Pi", "Custom ML models", "Fortune 500 R&D"],
    status: "private",
  },
  {
    title: "Terminal Portfolio",
    description: "This website — a cinematic Cold War terminal experience.",
    longDescription:
      "Interactive portfolio with CRT terminal boot, Soviet classified document transition, GSAP scroll animations, Web Audio API sound design, Matrix rain, and a hidden nuclear war simulation with 300 strikes on a real world map.",
    tags: ["React", "TypeScript", "GSAP", "D3-Geo", "Web Audio API", "Canvas2D"],
    github: "https://github.com/LVcicario/Concept-Website",
    metrics: ["10+ custom sound effects", "300-strike nuclear sim", "3 hidden easter eggs"],
    status: "open-source",
  },
  {
    title: "RAG Knowledge Base",
    description: "Retrieval-Augmented Generation for conversational AI.",
    longDescription:
      "Document ingestion pipeline with vector embeddings, semantic search, and a conversational AI interface. Users upload documents and query them in natural language. Built with Supabase pgvector and OpenAI embeddings.",
    tags: ["TypeScript", "LLM", "RAG", "Embeddings", "Supabase", "pgvector"],
    metrics: ["Semantic search", "Document ingestion", "Natural language queries"],
    status: "production",
  },
  {
    title: "Real-Time Dashboard",
    description: "Live data feeds with WebSocket updates and interactive charts.",
    longDescription:
      "Full-stack dashboard with role-based authentication, real-time WebSocket data streams, interactive D3 charts, and an admin panel. Designed for monitoring operational metrics at scale.",
    tags: ["Next.js", "WebSockets", "PostgreSQL", "D3.js", "Auth"],
    metrics: ["Real-time WebSocket feeds", "Role-based access", "Interactive D3 charts"],
    status: "production",
  },
  {
    title: "SaaS Starter Kit",
    description: "Production-ready boilerplate for launching SaaS products.",
    longDescription:
      "Opinionated SaaS starter with authentication, Stripe billing, multi-tenancy, admin panel, CI/CD, and Docker deployment. Used as the foundation for Nexalis.ai projects.",
    tags: ["TypeScript", "Next.js", "Stripe", "Supabase", "Docker", "CI/CD"],
    github: "https://github.com/LVcicario",
    metrics: ["Auth + billing built-in", "Multi-tenant", "Docker ready"],
    status: "open-source",
  },
];
