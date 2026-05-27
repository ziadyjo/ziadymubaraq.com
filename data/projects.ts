import type { Project } from "@/types";

export const PROJECTS = [
  {
    name: "Lunash",
    description: "AI-powered SaaS platform automating debt collection at scale",
    href: "#",
    logo: "/lunash.webp",
  },
  {
    name: "AL+ Agent",
    description: "WhatsApp AI agent for conversations and lead qualification",
    href: "#",
    logo: "/alplus.webp",
  },
  {
    name: "Auto Agent",
    description: "Chrome Extension automating data entry and navigation",
    href: "#",
    logo: "/autoagent.webp",
  },
  {
    name: "Speed Online",
    description: "Mobile app for booking ferry crossing tickets",
    href: "#",
    logo: "/speedonline.webp",
  },
  {
    name: "Dicicilaja",
    description: "Adira Finance marketplace app with 100K+ downloads",
    href: "#",
    logo: "/dicicilaja.webp",
  },
] as const satisfies readonly Project[];
