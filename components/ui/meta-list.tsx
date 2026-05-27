import { Fragment } from "react";
import { cn } from "@/lib/cn";

interface MetaListProps {
  /** Short metadata values rendered inline, separated by a middot. */
  items: readonly string[];
  className?: string;
}

/** Inline list of metadata (e.g. period · company · location). */
export function MetaList({ items, className }: MetaListProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 text-base text-foreground-tertiary md:text-sm",
        className,
      )}
    >
      {items.map((item, index) => (
        <Fragment key={item}>
          {index > 0 && (
            <span aria-hidden className="text-foreground-tertiary">
              &middot;
            </span>
          )}
          <span>{item}</span>
        </Fragment>
      ))}
    </div>
  );
}
