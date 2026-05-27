/** Personal identity and "About" content, kept separate from presentation. */
export const PROFILE = {
  brand: "@ziadyjo",
  firstName: "Ziady",
  lastName: "Mubaraq",
  fullName: "Ziady Mubaraq",
  avatar: {
    src: "/avatar.webp",
    size: 120,
  },
  about: {
    facts: [
      "Full-Stack Engineer",
      "Based in Jakarta",
      "5+ Years Experience",
      "Open to Work",
    ],
    bio: [
      "Obsessed with AI before it was cool. I build multi-agent systems, RAG pipelines, and AI-powered SaaS platforms that businesses run on 24/7.",
      "Right now? Pushing Claude Code and Codex so hard. No fluff.",
    ],
  },
} as const;
