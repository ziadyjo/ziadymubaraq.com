import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PROFILE } from "@/data/profile";
import "./globals.css";

export const metadata: Metadata = {
  title: PROFILE.fullName,
  description: "Full-Stack Engineer & AI Builder based in Jakarta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    // `data-scroll-behavior="smooth"` opts back into Next.js overriding the
    // CSS smooth scroll during route transitions (no longer the default in v16).
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="flex min-h-full flex-col bg-background-primary font-sans text-foreground-primary">
        {children}
      </body>
    </html>
  );
}
