import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/json-ld";
import { PROFILE } from "@/data/profile";
import { SITE } from "@/data/site";
import { structuredData } from "@/lib/structured-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s — ${PROFILE.fullName}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  applicationName: PROFILE.fullName,
  authors: [{ name: PROFILE.fullName, url: SITE.url }],
  creator: PROFILE.fullName,
  publisher: PROFILE.fullName,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: PROFILE.fullName,
    title: SITE.title,
    description: SITE.description,
    // `og:image` is supplied by app/opengraph-image.tsx.
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    creator: SITE.handle,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  // Matches `--background-primary`.
  themeColor: "#141413",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    // `data-scroll-behavior="smooth"` opts back into Next.js overriding the
    // CSS smooth scroll during route transitions (no longer the default in v16).
    <html lang={SITE.lang} className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="flex min-h-full flex-col bg-background-primary font-sans text-foreground-primary">
        <JsonLd data={structuredData} />
        {children}
      </body>
    </html>
  );
}
