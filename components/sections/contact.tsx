import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SOCIAL_LINKS } from "@/data/social";

const LINK_CLASS =
  "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-foreground-secondary transition-colors hover:bg-background-tertiary hover:text-foreground-primary";

export function Contact() {
  return (
    <ul className="flex flex-col gap-1">
      {SOCIAL_LINKS.map(({ label, href, external }) => (
        <li key={label}>
          <Link
            href={href}
            className={LINK_CLASS}
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          >
            {label} <ArrowRight className="h-4 w-4" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
