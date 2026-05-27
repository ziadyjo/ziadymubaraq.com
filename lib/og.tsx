import { ImageResponse } from "next/og";
import { PROFILE } from "@/data/profile";
import { SITE } from "@/data/site";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT = SITE.title;

// Mirrored from `app/globals.css` so the card matches the site.
const COLORS = {
  background: "#141413",
  foreground: "#faf9f5",
  muted: "#b0aea5",
  subtle: "#87867f",
  accent: "#d97757",
} as const;

/**
 * Renders the shared social card. `next/og` can't decode the site's `.woff2`
 * brand fonts (satori only supports ttf/otf/woff), so we rely on its bundled
 * default font and carry the brand through color and layout instead.
 */
export function renderOgImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px 80px",
          background: COLORS.background,
          color: COLORS.foreground,
          borderTop: `12px solid ${COLORS.accent}`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30 }}>
          <span style={{ color: COLORS.subtle }}>{SITE.handle}</span>
          <span style={{ color: COLORS.accent }}>ziterz.dev</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: "-0.03em" }}>
            {PROFILE.fullName}
          </div>
          <div style={{ fontSize: 42, color: COLORS.accent }}>{SITE.jobTitle}</div>
        </div>

        <div style={{ display: "flex", fontSize: 28, color: COLORS.muted }}>
          {PROFILE.about.facts.join("  ·  ")}
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
