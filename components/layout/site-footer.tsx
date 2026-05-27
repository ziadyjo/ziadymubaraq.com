import { Heart } from "lucide-react";

export function SiteFooter() {
  return (
    <div className="flex justify-center">
      <span className="inline-flex items-center gap-1.5 text-base text-foreground-tertiary">
        <span>&copy; {new Date().getFullYear()}</span>
        <span aria-hidden className="text-button-tertiary-border-hover">
          &middot;
        </span>
        <span className="inline-flex items-center gap-1">
          Made with
          <Heart className="h-3.5 w-3.5 fill-current" aria-label="love" />
        </span>
      </span>
    </div>
  );
}
