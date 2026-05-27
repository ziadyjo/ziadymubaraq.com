"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface SectionProps {
  /** Anchor id used as the in-page scroll target (e.g. `work`). */
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * A titled page section: a sticky heading beside its content on larger
 * screens. Inherits the reveal animation from its motion parent.
 */
export function Section({ id, title, children, className }: SectionProps) {
  return (
    <motion.section
      id={id}
      variants={fadeUp}
      className={cn(
        "flex scroll-mt-20 flex-col gap-4 py-16 sm:grid sm:grid-cols-2 sm:items-start sm:gap-x-8",
        className,
      )}
    >
      <div className="sm:sticky sm:top-20 sm:self-start">
        <h2 className="text-3xl font-medium">{title}</h2>
      </div>
      <div>{children}</div>
    </motion.section>
  );
}
