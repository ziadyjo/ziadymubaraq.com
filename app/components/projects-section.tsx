"use client";

import type { LucideIcon } from "lucide-react";
import { ArrowRight, LibraryBig } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Transition, Variants } from "motion/react";
import { motion } from "motion/react";

type Project = {
  name: string;
  description: string;
  href: string;
  logo?: string;
  Icon?: LucideIcon;
  iconColor?: string;
};

const PROJECTS: Project[] = [
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
];

const EASE = [0.16, 1, 0.3, 1] as const;

const ICON_SHIFT = 106;

const CARD_SHADOW =
  "rgba(0,0,0,0.24) 0px 0.706592px 0.423955px -0.5px, rgba(0,0,0,0.24) 0px 1.80656px 1.08394px -1px, rgba(0,0,0,0.23) 0px 3.62176px 2.17306px -1.5px, rgba(0,0,0,0.22) 0px 6.8656px 4.11936px -2px, rgba(0,0,0,0.2) 0px 13.6468px 8.18806px -2.5px, rgba(0,0,0,0.16) 0px 30px 18px -3px";

const SLIDE_SPRING: Transition = { type: "spring", stiffness: 460, damping: 28 };

const contentVariants: Variants = {
  rest: { x: 0 },
  hover: { x: ICON_SHIFT },
};

const textVariants: Variants = {
  rest: { opacity: 1 },
  hover: { opacity: 0 },
};

const viewVariants: Variants = {
  rest: { scale: 1, opacity: 0 },
  hover: { scale: 1, opacity: 1 },
};

export function ProjectsSection() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-50%] -right-8 -inset-y-16"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          backgroundPosition: "center center",
          WebkitMaskImage:
            "radial-gradient(ellipse 30% 50% at 35% 50%, black 50%, transparent 95%)",
          maskImage:
            "radial-gradient(ellipse 30% 50% at 35% 50%, black 50%, transparent 95%)",
        }}
      />
      <div className="relative flex flex-col gap-8">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ name, description, href, logo, Icon, iconColor }: Project) {
  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      transition={{ duration: 0.45, ease: EASE }}
      className="relative overflow-hidden rounded-2xl border border-button-secondary-border bg-button-secondary-background text-button-secondary-text transition-colors hover:border-button-secondary-border-hover hover:bg-button-secondary-background-hover hover:text-button-secondary-text-hover"
      style={{ boxShadow: CARD_SHADOW }}
    >
      <Link href={href} className="block" aria-label={`View ${name} project`}>
        <motion.div variants={contentVariants} transition={SLIDE_SPRING} className="p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-button-tertiary-background">
              {logo ? (
                <Image
                  src={logo}
                  alt={`${name} logo`}
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              ) : (
                Icon && (
                  <Icon className="h-6 w-6" style={{ color: iconColor }} strokeWidth={2.2} />
                )
              )}
            </div>
            <motion.div variants={textVariants} className="flex min-w-0 flex-col">
              <h4 className="text-md font-medium text-foreground-primary">{name}</h4>
              <p className="truncate text-sm text-foreground-tertiary">{description}</p>
            </motion.div>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute inset-0 flex items-center p-3">
          <motion.span
            variants={viewVariants}
            className="inline-flex h-12 origin-left items-center gap-2 rounded-xl bg-button-tertiary-background px-4 text-md text-foreground-primary"
          >
            View <ArrowRight className="h-4 w-4" />
          </motion.span>
        </div>
      </Link>
    </motion.div>
  );
}
