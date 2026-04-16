export interface Skill {
  name: string;
  category: "frontend" | "backend" | "ai" | "devops" | "business" | "languages";
}

export const skills: Skill[] = [
  // Frontend
  { name: "TypeScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "GSAP / Framer Motion", category: "frontend" },
  { name: "HTML5 / CSS3", category: "frontend" },
  { name: "Responsive Design", category: "frontend" },
  { name: "Figma / UI Design", category: "frontend" },

  // Backend
  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  { name: "Supabase", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "REST APIs", category: "backend" },
  { name: "WebSockets", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "Authentication / JWT", category: "backend" },

  // AI
  { name: "LLM Integration (GPT, Claude)", category: "ai" },
  { name: "Prompt Engineering", category: "ai" },
  { name: "AI Agents & Chains", category: "ai" },
  { name: "RAG Pipelines", category: "ai" },
  { name: "Automation & Workflows", category: "ai" },
  { name: "Data Processing", category: "ai" },

  // DevOps
  { name: "Git / GitHub", category: "devops" },
  { name: "Vercel / Railway", category: "devops" },
  { name: "Docker", category: "devops" },
  { name: "CI/CD", category: "devops" },
  { name: "Linux / Shell", category: "devops" },

  // Business
  { name: "SaaS Product Design", category: "business" },
  { name: "Product Lifecycle", category: "business" },
  { name: "Go-to-Market Strategy", category: "business" },
  { name: "Team Leadership (110+)", category: "business" },
  { name: "P&L Management", category: "business" },
  { name: "Client Relations", category: "business" },

  // Languages
  { name: "French — Native", category: "languages" },
  { name: "English — Fluent", category: "languages" },
  { name: "Chinese — Beginner", category: "languages" },
];
