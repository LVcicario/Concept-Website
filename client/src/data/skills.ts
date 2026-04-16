export interface Skill {
  name: string;
  category: "frontend" | "backend" | "ai" | "devops" | "business" | "languages";
  level: "expert" | "advanced" | "intermediate";
}

export const skills: Skill[] = [
  // Frontend
  { name: "TypeScript", category: "frontend", level: "expert" },
  { name: "React", category: "frontend", level: "expert" },
  { name: "Next.js", category: "frontend", level: "advanced" },
  { name: "Tailwind CSS", category: "frontend", level: "expert" },
  { name: "GSAP / Framer Motion", category: "frontend", level: "advanced" },
  { name: "HTML5 / CSS3", category: "frontend", level: "expert" },
  { name: "Responsive Design", category: "frontend", level: "expert" },
  { name: "Figma / UI Design", category: "frontend", level: "advanced" },

  // Backend
  { name: "Node.js", category: "backend", level: "expert" },
  { name: "Express", category: "backend", level: "expert" },
  { name: "Supabase", category: "backend", level: "expert" },
  { name: "PostgreSQL", category: "backend", level: "advanced" },
  { name: "REST APIs", category: "backend", level: "expert" },
  { name: "WebSockets", category: "backend", level: "advanced" },
  { name: "Python", category: "backend", level: "advanced" },
  { name: "Authentication / JWT", category: "backend", level: "advanced" },

  // AI
  { name: "LLM Integration (GPT, Claude)", category: "ai", level: "advanced" },
  { name: "Prompt Engineering", category: "ai", level: "advanced" },
  { name: "AI Agents & Chains", category: "ai", level: "advanced" },
  { name: "RAG Pipelines", category: "ai", level: "advanced" },
  { name: "Automation & Workflows", category: "ai", level: "advanced" },
  { name: "Data Processing", category: "ai", level: "intermediate" },

  // DevOps
  { name: "Git / GitHub", category: "devops", level: "expert" },
  { name: "Vercel / Railway", category: "devops", level: "advanced" },
  { name: "Docker", category: "devops", level: "intermediate" },
  { name: "CI/CD", category: "devops", level: "intermediate" },
  { name: "Linux / Shell", category: "devops", level: "intermediate" },

  // Business
  { name: "SaaS Product Design", category: "business", level: "expert" },
  { name: "Product Lifecycle", category: "business", level: "expert" },
  { name: "Go-to-Market Strategy", category: "business", level: "advanced" },
  { name: "Team Leadership (110+)", category: "business", level: "expert" },
  { name: "P&L Management", category: "business", level: "advanced" },
  { name: "Client Relations", category: "business", level: "advanced" },

  // Languages
  { name: "French — Native", category: "languages", level: "expert" },
  { name: "English — Fluent", category: "languages", level: "expert" },
  { name: "Chinese — Beginner", category: "languages", level: "intermediate" },
];
