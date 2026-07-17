// Single source of truth for every piece of site content.
// Phase 3 replaces these constants with database queries (see docs/PLAN.md) —
// components only ever import from here, so the swap won't touch the UI.

export type NavLink = {
  href: string;
  label: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type Project = {
  name: string;
  description: string;
  tech: string[]; // shown as tags — for case studies use methods/domains, not only tech
  href: string | null;
  imageUrl?: string | null;
  highlight: boolean;
};

export type Experience = {
  role: string;
  company: string;
  companyUrl: string | null;
  start: string; // display string, e.g. "2024"
  end: string | null; // null = present
  summary: string;
  highlights: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  year: string;
  href: string | null;
};

export const NAV_LINKS: NavLink[] = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Case studies" },
  { href: "#contact", label: "Contact" },
];

export const HERO = {
  greeting: "Hi, my name is",
  headline: "Tawfiqul Islam.",
  tagline: "I get complex projects shipped.",
  intro:
    "Project manager focused on FinTech — leading cross-functional teams that take banking and payments software from kickoff to launch: on time, in scope, and with stakeholders on board.",
  primaryCta: { label: "See my case studies", href: "#projects" },
};

export const ABOUT = {
  paragraphs: [
    "I'm a project manager from Bangladesh who enjoys sitting at the intersection of business and engineering — translating what clients need into plans that teams can actually deliver.",
    "At Era InfoTech I manage delivery of FinTech and banking software: running sprints and milestones, coordinating developers, QA, vendors and bank stakeholders, and keeping scope, risk and timelines honest.",
    // TODO: Replace with your own story — education, years of experience, what drives you.
    "Outside of delivery work I stay close to the product side — I understand how modern web and mobile apps are built, which keeps my estimates realistic and my conversations with engineers grounded.",
  ],
};

export const EXPERIENCES: Experience[] = [
  // TODO: Fill in your real roles, dates and achievements — numbers (team size,
  // projects delivered, on-time %) make a PM profile far more convincing.
  {
    role: "Project Manager",
    company: "Era InfoTech Ltd.",
    companyUrl: "https://www.erainfotechbd.com",
    start: "2024",
    end: null,
    summary:
      "Managing end-to-end delivery of FinTech and banking software projects for financial institutions in Bangladesh.",
    highlights: [
      "Leading cross-functional teams of developers, QA and designers through Agile sprints and release milestones.",
      "Coordinating requirements, UAT and go-lives with bank stakeholders and third-party vendors.",
      "Owning project scope, schedules, risk registers and status reporting to management and clients.",
    ],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "Delivery & Methodology",
    items: ["Agile / Scrum", "Kanban", "Hybrid & Waterfall", "Sprint & release planning"],
  },
  {
    label: "Planning & Analysis",
    items: ["Project scheduling", "Risk management", "Requirements (BRD / SRS)", "Estimation & budgeting"],
  },
  {
    label: "Leadership & Communication",
    items: ["Stakeholder management", "Cross-functional team leadership", "Vendor coordination", "Client & UAT management"],
  },
  {
    label: "Tools & Domain",
    items: ["Jira / Confluence", "MS Project / Excel", "FinTech & core banking", "Git & SDLC fluency"],
  },
];

export const PROJECTS: Project[] = [
  // TODO: Replace with 2–4 real FinTech case studies. A strong case study covers:
  // the client problem → scope & team → how you ran delivery → measurable outcome.
  {
    name: "Banking software delivery — case study",
    description:
      "Placeholder — describe a FinTech project you managed: the client's problem, the scope and team you led, how you ran delivery (sprints, milestones, UAT, go-live), and the measurable outcome — on-time launch, adoption numbers, or cost savings.",
    tech: ["Agile / Scrum", "Core banking", "UAT & go-live", "Stakeholder management"],
    href: null,
    highlight: true,
  },
  {
    name: "RideTrack",
    description:
      "A personal product I lead end-to-end: a Strava-style community app for bike and car enthusiasts with live GPS tracking, route maps and social feeds. I own the roadmap, scope and releases — proof that I can drive a product from idea to working software.",
    tech: ["Product roadmap", "Scope & releases", "React Native", "Supabase"],
    href: "https://github.com/tawfiq01/ridetrack",
    highlight: false,
  },
];

export const CERTIFICATIONS: Certification[] = [
  // TODO: Replace with your real certifications — e.g. PMP, CAPM, PSM/CSM, PRINCE2,
  // ICAgile — with issuer, year and credential URL. Remove any you don't hold.
  {
    name: "Your PM certification",
    issuer: "Issuing organization (e.g. PMI, Scrum.org)",
    year: "2025",
    href: null,
  },
];

export const CONTACT = {
  blurb:
    "Hiring a project manager who can keep FinTech delivery on track — or want to talk about a project? My inbox is open.",
  ctaLabel: "Say hello",
};
