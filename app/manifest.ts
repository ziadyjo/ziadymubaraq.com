import type { MetadataRoute } from "next";
import { PROFILE } from "@/data/profile";
import { SITE } from "@/data/site";

// Colors mirror the dark theme in `app/globals.css`.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.title,
    short_name: PROFILE.fullName,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#141413",
    theme_color: "#141413",
    icons: [
      {
        src: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
