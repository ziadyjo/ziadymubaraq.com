import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

// Single-page site, so one canonical entry.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
