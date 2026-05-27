import type { NavLink } from "@/types";

export const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
  { href: "/", label: "Back Home" },
] as const satisfies readonly NavLink[];
