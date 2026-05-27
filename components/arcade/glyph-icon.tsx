import type { GlyphConfig } from "./constants";

interface GlyphIconProps {
  glyph: GlyphConfig;
  color: string;
  /** Base size in px; the icon is rendered at 3× for a bold, filled look. */
  size?: number;
}

export function GlyphIcon({ glyph: { Icon, className }, color, size = 18 }: GlyphIconProps) {
  return (
    <Icon
      className={className}
      size={size * 3}
      strokeWidth={2.2}
      style={{ color }}
      fill={color}
      aria-hidden
    />
  );
}
