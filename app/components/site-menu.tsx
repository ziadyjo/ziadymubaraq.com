"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { forwardRef, useEffect, useRef, useState } from "react";

const SITE_TITLE = "@ziadyjo";

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
  { href: "/", label: "Back Home" },
] as const;

const menuEase = [0.22, 1, 0.36, 1] as const;

const MenuButton = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button"> & { open: boolean }
>(function MenuButton({ open, className, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className={`inline-flex cursor-pointer items-center gap-2 text-md text-foreground-secondary outline-none transition-colors hover:text-foreground-primary focus-visible:text-foreground-primary ${className ?? ""}`}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="site-menu-panel"
      {...props}
    >
      {open ? (
        <X className="size-[18px]" strokeWidth={1.5} aria-hidden />
      ) : (
        <Menu className="size-[18px]" strokeWidth={1.5} aria-hidden />
      )}
      <span>Menu</span>
    </button>
  );
});

export function SiteMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  // Set while a nav link is closing the menu, so the panel collapses
  // instantly (no animation). That lets the page settle to its real
  // layout in one frame, after which we scroll to the section.
  const [closingForNav, setClosingForNav] = useState(false);
  // Hash to scroll to once the panel has fully collapsed (see onExitComplete).
  const pendingHash = useRef<string | null>(null);

  function handleNavClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    event.preventDefault();

    // Non-hash links (e.g. "Back Home") are real route changes — navigate
    // there and drop any "#section" left in the URL.
    if (!href.startsWith("#")) {
      setOpen(false);
      router.push(href);
      return;
    }

    // Collapse instantly, then scroll from onExitComplete — once the panel
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

  return (
    <header className="sticky top-0 z-50 w-full bg-background-primary">
      <div className="relative border-b border-button-secondary-background">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between py-4 px-10 md:px-0">
          <Link
            href="/"
            className="text-md text-foreground-secondary transition-colors hover:text-foreground-primary"
          >
            {SITE_TITLE}
          </Link>
          <MenuButton open={open} onClick={() => setOpen((value) => !value)} />
        </div>

        {/* Overlay panel below the bar: absolutely positioned so opening
            drops it over the page content instead of pushing it down. */}
        <AnimatePresence initial={false} onExitComplete={handleExitComplete}>
          {open && (
            <motion.div
              id="site-menu-panel"
              key="site-menu-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: closingForNav ? 0 : 0.2, ease: menuEase }}
              className="absolute left-0 top-full w-full overflow-hidden border-b border-button-secondary-background bg-background-primary"
            >
              <nav aria-label="Site navigation" className="pb-4">
                {navLinks.map(({ href, label }, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      ease: menuEase,
                    }}
                  >
                    <div className="mx-auto w-full max-w-3xl px-10 md:px-0">
                      <a
                        href={href}
                        onClick={(event) => handleNavClick(event, href)}
                        className={`block py-2 text-right text-md text-foreground-secondary transition-colors hover:text-foreground-primary ${index < navLinks.length - 1
                          ? "border-b border-button-secondary-background"
                          : ""
                          }`}
                      >
                        {label}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
