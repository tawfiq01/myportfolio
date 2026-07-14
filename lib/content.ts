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
  tech: string[];
  href: string | null;
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
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export const HERO = {
  greeting: "Hi, my name is",
  headline: "Tawfiqul Islam.",
  tagline: "I build apps people move with.",
  intro:
    "Software developer focused on mobile and web — React Native, React, TypeScript and Supabase. Currently building RideTrack, a GPS ride-tracking app for bikers and drivers.",
  primaryCta: { label: "See my work", href: "#projects" },
};

export const ABOUT = {
  paragraphs: [
    "I'm a software developer from Bangladesh who enjoys turning ideas into products people actually use. My current focus is mobile-first development — building smooth, reliable apps with React Native and Expo, backed by Supabase and PostgreSQL.",
    "Right now I'm building RideTrack, a Strava-style community app for bike and car enthusiasts: live GPS activity tracking, route maps, social feeds, clubs and events.",
    // TODO: Replace with your own story — education, experience, what drives you.
    "When I'm not coding, I'm exploring new tools in the React ecosystem and sharpening my product-design eye.",
  ],
};

export const EXPERIENCES: Experience[] = [
  // TODO: Fill in your real roles, dates and achievements.
  {
    role: "Software Developer",
    company: "Era InfoTech Ltd.",
    companyUrl: "https://www.erainfotechbd.com",
    start: "2024",
    end: null,
    summary:
      "Building FinTech and banking software solutions for financial institutions in Bangladesh.",
    highlights: [
      "Developing mobile-first products with React Native, Expo and TypeScript.",
      "Working with Supabase and PostgreSQL-backed services.",
    ],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "Mobile",
    items: ["React Native", "Expo", "EAS Build", "expo-location / maps"],
  },
  {
    label: "Web",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend & Data",
    items: ["Supabase", "PostgreSQL", "PostGIS", "REST APIs"],
  },
  {
    label: "Tools",
    items: ["Git & GitHub", "VS Code", "Figma", "CI/CD"],
  },
];

export const PROJECTS: Project[] = [
  {
    name: "RideTrack",
    description:
      "A Strava-style community app for bike and car enthusiasts. Live GPS activity recording with real-time distance/speed stats and route drawing on a map, activity feed, profiles, vehicles and clubs — built mobile-first with a web preview.",
    tech: ["React Native", "Expo", "TypeScript", "Supabase", "react-native-maps", "Leaflet"],
    href: "https://github.com/tawfiq01/ridetrack",
    highlight: true,
  },
  // TODO: Add more of your projects below — 2–4 strong ones beat a long list.
  {
    name: "Your next project",
    description:
      "Placeholder — describe a project you're proud of: the problem, what you built, and the result.",
    tech: ["—"],
    href: null,
    highlight: false,
  },
];

export const CERTIFICATIONS: Certification[] = [
  // TODO: Replace with your real certifications (name, issuer, year, credential URL).
  {
    name: "Your certification",
    issuer: "Issuing organization",
    year: "2025",
    href: null,
  },
];

export const CONTACT = {
  blurb:
    "Whether you have a project in mind, a role to fill, or just want to say hi — my inbox is open.",
  ctaLabel: "Say hello",
};
