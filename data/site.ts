import { PROFILE } from "@/data/profile";

/**
 * Single source of truth for site-wide SEO + metadata.
 *
 * Everything that needs the canonical origin (metadata, OG image, manifest,
 * robots, sitemap, structured data) reads it from here — change the domain in
 * one place and it propagates everywhere.
 */
export const SITE = {
  url: "https://ziterz.dev",
  name: PROFILE.fullName,
  title: `${PROFILE.fullName}`,
  description:
    "Full-Stack Engineer & AI Builder in Jakarta. I build multi-agent systems, RAG pipelines, and AI-powered SaaS platforms that businesses run on 24/7.",
  jobTitle: "Full-Stack Engineer & AI Builder",
  // OpenGraph locale uses `_`; the `<html lang>` uses `-`.
  locale: "en_US",
  lang: "en",
  handle: PROFILE.brand,
  city: "Jakarta",
  country: "ID",
  keywords: [
    PROFILE.fullName,
    "Full-Stack Engineer",
    "AI Engineer",
    "AI Builder",
    "Multi-Agent Systems",
    "RAG Pipelines",
    "LLM",
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
    "AWS",
    "SaaS",
    "Software Engineer",
    "Jakarta",
  ],
} as const;
