export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  tags: string[];
}

export const experiences: Experience[] = [
  {
    title: "Founder & Full-Stack Developer",
    company: "Nexalis.ai",
    period: "Dec 2025 — Present",
    description: [
      "Built and shipped AI-powered SaaS tools from idea to production deployment.",
      "Full product lifecycle: architecture, UI/UX, backend, AI pipelines, go-to-market.",
      "Tech: TypeScript, React, Node.js, Supabase, LLM APIs.",
    ],
    tags: ["TypeScript", "React", "Node.js", "Supabase", "AI", "SaaS"],
  },
  {
    title: "AI Expert",
    company: "ABB",
    period: "Sep 2024 — Jun 2025",
    description: [
      "Contributed to AI and automation use cases within a Fortune 500 industrial group.",
      "Cross-functional collaboration on data-driven projects under confidentiality.",
      "Delivered automation workflows that improved internal processes.",
    ],
    tags: ["AI", "Automation", "Python", "Data", "Enterprise"],
  },
  {
    title: "Store Director",
    company: "Retail — 110 employees",
    period: "Feb 2023 — Sep 2023",
    description: [
      "Directed daily operations for a 110-employee supermarket.",
      "Full P&L ownership, recruitment, training, and performance management.",
      "High-pressure environment — systems thinking, execution under fire.",
    ],
    tags: ["Leadership", "Operations", "P&L", "Team Management"],
  },
];
