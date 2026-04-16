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
      "Built and shipped an AI-powered SaaS platform from zero to production.",
      "Full product lifecycle: architecture, UI/UX, backend, AI integration, deployment, go-to-market.",
      "Multi-tenant system with real-time features, Stripe billing, and AI automation workflows.",
      "Tech: TypeScript, React, Node.js, Supabase, OpenAI APIs.",
    ],
    tags: ["TypeScript", "React", "Node.js", "Supabase", "AI", "SaaS"],
  },
  {
    title: "AI Expert",
    company: "ABB — Global Industrial Technology",
    period: "Sep 2024 — Jun 2025",
    description: [
      "Designed and deployed AI modules on Raspberry Pi for edge computing use cases.",
      "Created custom AI models for industrial automation within a $30B Fortune 500 group.",
      "Worked on confidential R&D projects at the intersection of AI and industrial IoT.",
      "Cross-functional collaboration with engineering teams across multiple countries.",
    ],
    tags: ["AI/ML", "Raspberry Pi", "Edge Computing", "Python", "IoT", "R&D"],
  },
  {
    title: "Store Director",
    company: "Retail — 110 employees",
    period: "Feb 2023 — Sep 2023",
    description: [
      "Directed daily operations for a 110-employee supermarket.",
      "Full P&L ownership — budget management, margin optimization, cost control.",
      "Led recruitment, training, and performance management for all departments.",
      "Built systems thinking and execution discipline in high-pressure operations.",
    ],
    tags: ["Leadership", "Operations", "P&L", "Recruitment", "Team Management"],
  },
];
