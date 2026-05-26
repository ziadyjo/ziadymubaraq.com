"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { forwardRef, useEffect, useState } from "react";

const SITE_TITLE = "@ziadyjo";

const navLinks = [
  { href: "/proficiencies", label: "Proficiencies" },
  { href: "/work", label: "Work" },
  { href: "/education", label: "Education" },
  { href: "/certificates", label: "Certificates" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
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
  const [open, setOpen] = useState(false);

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
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="site-menu-panel"
            key="site-menu-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: menuEase }}
            className="box-border overflow-hidden border-t border-border-tertiary"
          >
            <nav aria-label="Site navigation" className="pt-4">
              {navLinks.map(({ href, label }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.04 + index * 0.04,
                    ease: menuEase,
                  }}
                >
                  <div className="mx-auto w-full max-w-3xl px-4 md:px-0">
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className="block border-b border-border-tertiary py-2 text-right text-md text-foreground-secondary transition-colors hover:text-foreground-primary"
                    >
                      {label}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-b border-border-tertiary">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between py-4 px-4 md:px-0">
          <Link
            href="/"
            className="text-md text-foreground-secondary transition-colors hover:text-foreground-primary"
          >
            {SITE_TITLE}
          </Link>
          <MenuButton open={open} onClick={() => setOpen((value) => !value)} />
        </div>
      </div>
    </header>
  );
}
