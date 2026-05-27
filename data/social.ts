import type { SocialLink } from "@/types";

// Annotated (rather than `as const satisfies`) so every entry widens to the
// same `SocialLink` shape, keeping the optional `external` field accessible
// when mapping.
export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: "Mail", href: "mailto:ziady.mubaraq@gmail.com" },
  { label: "GitHub", href: "https://github.com/ziadyjo", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ziadyjo/", external: true },
  { label: "X", href: "https://www.x.com/ziadyjo/", external: true },
];
