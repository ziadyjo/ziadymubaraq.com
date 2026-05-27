"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export interface SiteMenuController {
  open: boolean;
  /** True only while a nav link is collapsing the panel without animation. */
  closingForNav: boolean;
  toggle: () => void;
  handleNavClick: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
  handleExitComplete: () => void;
}

/**
 * Owns the mobile menu's open/close state and the "collapse, then scroll"
 * navigation flow, keeping {@link SiteHeader} focused on markup.
 */
export function useSiteMenu(): SiteMenuController {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  // Set while a nav link is closing the menu so the panel collapses instantly
  // (no animation). The page can then settle to its real layout in one frame,
  // after which we scroll to the section.
  const [closingForNav, setClosingForNav] = useState(false);
  // Hash to scroll to once the panel has fully collapsed (see handleExitComplete).
  const pendingHash = useRef<string | null>(null);

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();

    // Non-hash links (e.g. "Back Home") are real route changes — navigate
    // there and drop any "#section" left in the URL.
    if (!href.startsWith("#")) {
      setOpen(false);
      router.push(href);
      return;
    }

    // Collapse instantly, then scroll from handleExitComplete — once the panel
    // is gone and the layout has settled, so the scroll isn't canceled.
    pendingHash.current = href;
    setClosingForNav(true);
    setOpen(false);
  }

  function handleExitComplete() {
    setClosingForNav(false);
    const href = pendingHash.current;
    if (!href) return;
    pendingHash.current = null;

    const target = document.getElementById(href.replace("#", ""));
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", href);
  }

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return {
    open,
    closingForNav,
    toggle: () => setOpen((value) => !value),
    handleNavClick,
    handleExitComplete,
  };
}
