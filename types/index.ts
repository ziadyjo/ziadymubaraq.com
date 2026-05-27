import type { LucideIcon } from "lucide-react";

/**
 * Shared, cross-cutting domain types for the site's content.
 *
 * Component-local prop types live with their components, and the arcade
 * feature owns its own engine types — only types reused across `data/` and
 * multiple components belong here.
 */

export interface WorkExperience {
  readonly role: string;
  readonly period: string;
  readonly company: string;
  readonly location: string;
  readonly description: readonly string[];
  readonly current?: boolean;
}

export interface Education {
  readonly degree: string;
  readonly period: string;
  readonly institution: string;
  readonly location: string;
  readonly description: string;
}

interface ProjectBase {
  readonly name: string;
  readonly description: string;
  readonly href: string;
}

/**
 * A project is shown with *either* a logo image *or* a Lucide icon — never
 * both. Modelling it as a union lets the type system enforce that at the call
 * site and narrow cleanly with `"logo" in project`.
 */
export type Project = ProjectBase &
  ({ readonly logo: string } | { readonly icon: LucideIcon; readonly iconColor?: string });

export interface NavLink {
  readonly href: string;
  readonly label: string;
}

export interface SocialLink {
  readonly label: string;
  readonly href: string;
  /** External links open in a new tab with safe `rel`. */
  readonly external?: boolean;
}
