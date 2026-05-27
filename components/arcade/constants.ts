import type { LucideIcon } from "lucide-react";
import {
  Circle,
  Diamond,
  Hexagon,
  Hourglass,
  Square,
  Star,
  Triangle,
  Zap,
} from "lucide-react";

export interface GlyphConfig {
  readonly id: string;
  readonly Icon: LucideIcon;
  readonly className?: string;
}

/** Icon set the two players' pieces are drawn from. */
export const GLYPHS = [
  { id: "triangle", Icon: Triangle, className: "rotate-180" },
  { id: "hourglass", Icon: Hourglass },
  { id: "diamond", Icon: Diamond },
  { id: "circle", Icon: Circle },
  { id: "square", Icon: Square },
  { id: "star", Icon: Star },
  { id: "hexagon", Icon: Hexagon },
  { id: "zap", Icon: Zap },
] as const satisfies readonly GlyphConfig[];

/** Colour palette the two players' pieces are drawn from. */
export const COLOR_PALETTE = ["#c46686", "#6a98bc", "#cbcadb", "#788c5d"] as const;

export const CELL_COLOR = {
  empty: "#3a3a3a",
  hover: "#555555",
  winning: "#ffffff",
} as const;

/** How long the computer "thinks" before dropping its piece. */
export const COMPUTER_THINK_MS = 320;
