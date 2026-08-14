import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiShadcnui,
  SiNodedotjs,
  SiGraphql,
  SiPostgresql,
  SiFirebase,
  SiSupabase,
  SiRedux,
  SiReactquery,
  SiFastapi,
  SiGooglebigquery,
  SiLangchain,
  SiPython,
  SiGit,
  SiMui,
  SiExpo,
} from "react-icons/si";

/* ------------------------------------------------------------------ */
/*  Profile                                                            */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "Haidar Fiaz",
  firstName: "Haidar",
  lastName: "Fiaz",
  role: "Full-Stack React Developer",
  subRoles: ["React Native", "Next.js", "TypeScript"],
  location: "Lahore, Pakistan",
  tagline:
    "Building fast, scalable web and mobile products for teams across Pakistan and the US.",
  email: "haiderfiaz05@gmail.com",
  linkedin: "https://linkedin.com/in/haiderfiaz",
  creative: "https://n24arts.com",
  resumeHref: "#contact",
  about: [
    "I'm a Full-Stack React Developer specializing in React, Next.js, TypeScript, and React Native. I build responsive, high-performance web and mobile applications backed by scalable GraphQL and REST APIs, PostgreSQL, and Firebase/Supabase.",
    "Currently an Associate Software Developer at Wonder Craftz, I collaborate directly with US-based product teams in Agile environments, shipping real-time systems, analytics pipelines, and AI-powered features. I hold a BSCS from the University of Lahore (CGPA 3.55) and bring production experience in RAG, LangChain, and vector search — differentiators that go beyond typical frontend work.",
  ],
} as const;

export const stats = [
  { value: "6+", label: "Products shipped" },
  { value: "2", label: "Apps live on the App Store" },
  { value: "40", label: "Employees on tooling I built" },
  { value: "US", label: "Teams I ship with daily" },
];

/* ------------------------------------------------------------------ */
/*  Skills                                                             */
/* ------------------------------------------------------------------ */

export type Skill = {
  name: string;
  icon: IconType;
  color: string;
  group: SkillGroup;
  /** brand mark is near-black — follow the theme instead of the brand colour */
  mono?: boolean;
};

export type SkillGroup =
  | "Languages & Frameworks"
  | "Styling & UI"
  | "Backend & APIs"
  | "Data & Cloud"
  | "State"
  | "AI / ML";

export const skills: Skill[] = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", group: "Languages & Frameworks" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", group: "Languages & Frameworks" },
  { name: "React", icon: SiReact, color: "#61DAFB", group: "Languages & Frameworks" },
  { name: "Next.js", icon: SiNextdotjs, color: "#0A0A0A", group: "Languages & Frameworks", mono: true },
  { name: "React Native", icon: SiExpo, color: "#000020", group: "Languages & Frameworks", mono: true },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", group: "Styling & UI" },
  { name: "shadcn/ui", icon: SiShadcnui, color: "#0F172A", group: "Styling & UI", mono: true },
  { name: "Material UI", icon: SiMui, color: "#007FFF", group: "Styling & UI" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E", group: "Backend & APIs" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098", group: "Backend & APIs" },
  { name: "FastAPI", icon: SiFastapi, color: "#009688", group: "Backend & APIs" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", group: "Data & Cloud" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28", group: "Data & Cloud" },
  { name: "Supabase", icon: SiSupabase, color: "#3FCF8E", group: "Data & Cloud" },
  { name: "BigQuery", icon: SiGooglebigquery, color: "#669DF6", group: "Data & Cloud" },
  { name: "Redux Toolkit", icon: SiRedux, color: "#764ABC", group: "State" },
  { name: "React Query", icon: SiReactquery, color: "#FF4154", group: "State" },
  { name: "LangChain / RAG", icon: SiLangchain, color: "#1C3C3C", group: "AI / ML", mono: true },
  { name: "Python", icon: SiPython, color: "#3776AB", group: "AI / ML" },
  { name: "Git & CI/CD", icon: SiGit, color: "#F05032", group: "Backend & APIs" },
];

export const skillGroups: { title: SkillGroup; items: string[] }[] = [
  {
    title: "Languages & Frameworks",
    items: [
      "JavaScript",
      "TypeScript",
      "React",
      "React Hooks",
      "Next.js",
      "React Native (CLI)",
    ],
  },
  {
    title: "Styling & UI",
    items: ["Tailwind CSS", "ShadCN", "Material UI", "Responsive Design"],
  },
  {
    title: "Backend & APIs",
    items: ["Node.js", "RESTful APIs", "GraphQL", "FastAPI", "Cloud Functions"],
  },
  {
    title: "Data & Cloud",
    items: ["PostgreSQL", "Firebase", "Firestore", "Supabase", "BigQuery"],
  },
  {
    title: "State",
    items: ["Redux Toolkit", "Zustand", "React Query"],
  },
  {
    title: "AI / ML",
    items: ["RAG", "LangChain", "Chroma DB", "Vector / Semantic Search"],
  },
];

/* ------------------------------------------------------------------ */
/*  Experience                                                         */
/* ------------------------------------------------------------------ */

export type TimelineItem = {
  id: string;
  title: string;
  org: string;
  period: string;
  kind: "work" | "education" | "milestone";
  points: string[];
  tags: string[];
};

export const timeline: TimelineItem[] = [
  {
    id: "wonder-craftz",
    title: "Associate Software Developer",
    org: "Wonder Craftz",
    period: "Oct 2025 — Present",
    kind: "work",
    points: [
      "Shipped responsive, pixel-perfect web and mobile features in Next.js, React, TypeScript and React Native (CLI); built a shared component library used across multiple product screens.",
      "Built a custom real-time chat system and GraphQL/REST-backed dashboards on PostgreSQL.",
      "Connected Firebase Analytics to BigQuery and PostgreSQL to surface user-activity insights informing performance and scalability decisions.",
      "Shipped push notifications and third-party API integrations; reviewed peer code to raise engineering standards.",
    ],
    tags: ["Next.js", "React Native", "GraphQL", "PostgreSQL", "BigQuery"],
  },

  {
    id: "dev-corporate",
    title: "Summer Intern",
    org: "The Dev Corporate",
    period: "Aug 2024 — Oct 2024",
    kind: "work",
    points: [
      "Built authentication flows and routing in React using Hooks and TypeScript under senior engineer review.",
    ],
    tags: ["React", "TypeScript", "Auth"],
  },
  {
    id: "uol",
    title: "BSCS — Computer Science",
    org: "The University of Lahore",
    period: "Sep 2022 — Jun 2026 · CGPA 3.55",
    kind: "education",
    points: [
      "Bachelor of Science in Computer Science with a focus on web systems, data structures and applied AI.",
    ],
    tags: ["CGPA 3.55"],
  },
];

/* ------------------------------------------------------------------ */
/*  Projects                                                           */
/* ------------------------------------------------------------------ */

export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  year: string;
  summary: string;
  points: string[];
  stack: string[];
  href?: string;
  linkLabel?: string;
  accent: string;
};

export const projects: Project[] = [
  {
    id: "tameer-web",
    index: "01",
    title: "Tameer.ai",
    subtitle: "Web Platform",
    year: "2025 — 2026",
    summary:
      "Pakistan's first zero-commission real estate and construction marketplace, on the web.",
    points: [
      "Delivered pixel-perfect, high-performance features from Figma using Next.js and TypeScript.",
      "Built backend services with Cloud Functions and GraphQL, wiring PostgreSQL and BigQuery into Google Analytics for user-behaviour tracking.",
      "Shipped RAG-based semantic search with LangChain and Chroma DB — in production.",
    ],
    stack: ["Next.js", "TypeScript", "GraphQL", "PostgreSQL", "BigQuery", "LangChain"],
    href: "https://www.tameer.ai",
    linkLabel: "Visit website",
    accent: "var(--primary)",
  },
  {
    id: "tameer-mobile",
    index: "02",
    title: "Tameer.ai",
    subtitle: "iOS & Android App",
    year: "2025 — 2026",
    summary:
      "The zero-commission marketplace in your pocket — built with React Native CLI.",
    points: [
      "Delivered ~60% of core app functionality with secure token-based authentication.",
      "Built a real-time chat system and push notifications.",
      "Cut screen drop rate through thread-level performance optimisation.",
    ],
    stack: ["React Native", "REST APIs", "Push Notifications"],
    href: "https://apps.apple.com/app/id6762259812",
    linkLabel: "App Store",
    accent: "var(--accent)",
  },
  {
    id: "healthexplorer",
    index: "03",
    title: "Healthexplorer.ai",
    subtitle: "Mobile App",
    year: "2025",
    summary:
      "A cross-platform health app focused on accessible, real-time user experiences.",
    points: [
      "Delivered pixel-perfect, high-performance frontend screens from Figma using React Native.",
      "Integrated RESTful backend APIs with secure token-based authentication.",
      "Applied thread-level performance optimisations to reduce screen drop rate.",
    ],
    stack: ["React Native", "REST APIs", "Realtime"],
    href: "https://apps.apple.com/pk/app/healthexplorer-ai/id6744935584",
    linkLabel: "App Store",
    accent: "var(--primary)",
  },
  {
    id: "deepsync",
    index: "04",
    title: "DeepSync",
    subtitle: "Employee & Project Management",
    year: "2025",
    summary:
      "A full-stack internal platform managing 30–40 employees with real-time tracking and resource planning.",
    points: [
      "Reduced Firestore read/write costs by redesigning the data structure with batching and caching.",
      "Automated data sync with serverless Cloud Functions; built Next.js API routes for salary management and Slack integration.",
      "Added AI-powered ticket generation and role-based authentication.",
    ],
    stack: ["Next.js", "Firebase", "PostgreSQL", "Cloud Functions"],
    accent: "var(--accent)",
  },
  {
    id: "n24arts",
    index: "05",
    title: "n24arts.com",
    subtitle: "E-Commerce Platform",
    year: "2024",
    summary:
      "A responsive e-commerce and creative platform, built end-to-end as a personal product.",
    points: [
      "Built authentication, database and real-time data handling on Firebase.",
      "Added animated UI transitions to lift the shopping experience.",
    ],
    stack: ["Firebase", "React", "Animation"],
    href: "https://n24arts.com",
    linkLabel: "Visit store",
    accent: "var(--primary)",
  },
  {
    id: "finance",
    index: "06",
    title: "Finance Tracker",
    subtitle: "React Native + AI",
    year: "2026",
    summary:
      "A personal finance app that reads your SMS receipts and categorises spending on its own.",
    points: [
      "Built SMS parsing to auto-capture transactions.",
      "AI-based categorisation via OpenRouter for automatic expense tagging.",
      "Supabase for auth and real-time data sync.",
    ],
    stack: ["React Native", "Supabase", "OpenRouter AI"],
    accent: "var(--accent)",
  },
];

/* ------------------------------------------------------------------ */
/*  Certifications                                                     */
/* ------------------------------------------------------------------ */

export const certifications = [
  {
    title: "GraphQL Fundamentals",
    detail: "API design, schema modelling, frontend integration",
  },
  { title: "Advanced React", detail: "Patterns, performance, composition" },
  {
    title: "Generative AI Applications with RAG and LangChain",
    detail: "Retrieval pipelines, chains, evaluation",
  },
  {
    title: "Vector Databases with Chroma DB",
    detail: "Embeddings, semantic search, indexing",
  },
  {
    title: "Python for Data Science, AI & Development",
    detail: "Data handling, analysis, scripting",
  },
];

/* ------------------------------------------------------------------ */
/*  Signature stack — the four things he actually ships with, each      */
/*  attributed to the real products it shipped in.                      */
/* ------------------------------------------------------------------ */

export type Signature = {
  name: string;
  icon: IconType;
  color: string;
  mono?: boolean;
  role: string;
  shippedIn: string[];
};

export const signatureStack: Signature[] = [
  {
    name: "Next.js + TypeScript",
    icon: SiNextdotjs,
    color: "#0A0A0A",
    mono: true,
    role: "Web platforms, SSR, API routes",
    shippedIn: ["Tameer.ai Web", "DeepSync"],
  },
  {
    name: "React Native (CLI)",
    icon: SiExpo,
    color: "#000020",
    mono: true,
    role: "Cross-platform apps, real-time chat, push",
    shippedIn: ["Tameer.ai App", "Healthexplorer.ai", "Finance Tracker"],
  },
  {
    name: "GraphQL + PostgreSQL",
    icon: SiGraphql,
    color: "#E10098",
    role: "Typed APIs and analytics dashboards",
    shippedIn: ["Tameer.ai Web", "Wonder Craftz dashboards"],
  },
  {
    name: "RAG · LangChain",
    icon: SiLangchain,
    color: "#1C3C3C",
    mono: true,
    role: "Semantic search running in production",
    shippedIn: ["Tameer.ai semantic search"],
  },
];

/** Numeric versions of the headline stats, for the count-up tiles. */
export const proofStats = [
  { value: 6, suffix: "", label: "Products shipped" },
  { value: 2, suffix: "", label: "Apps live on the App Store" },
  { value: 40, suffix: "", label: "People using tooling I built" },
  { value: 20, suffix: "+", label: "Tools in rotation" },
];

export const currently = {
  role: "Associate Software Developer",
  company: "Wonder Craftz",
  since: "Oct 2025",
  focus: "Real-time systems, analytics pipelines, AI-powered features",
  timeZone: "Asia/Karachi",
};

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];
