"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { forwardRef, useEffect, useState } from "react";

const SITE_TITLE = "@itsz";

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
      className={`inline-flex cursor-pointer items-center gap-2.5 text-sm text-zinc-400 outline-none transition-colors hover:text-zinc-200 focus-visible:text-zinc-200 ${className ?? ""}`}
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
    <header className="sticky top-0 z-50 w-full bg-[#141413]">
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="site-menu-panel"
            key="site-menu-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: menuEase }}
            className="overflow-hidden border-t border-zinc-800/80"
          >
            <nav aria-label="Site navigation">
              {navLinks.map(({ href, label }, index) => (
                <motion.div
                  key={label}
                  className="border-b border-zinc-800/80"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.04 + index * 0.04,
                    ease: menuEase,
                  }}
                >
                  <div className="mx-auto w-full max-w-4xl">
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className="block py-4 text-right text-sm text-zinc-300 transition-colors hover:text-zinc-50"
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

      <div className="border-b border-zinc-800/80">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between py-4">
          <Link
            href="/"
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-200"
          >
            {SITE_TITLE}
          </Link>
          <MenuButton open={open} onClick={() => setOpen((value) => !value)} />
        </div>
      </div>
    </header>
  );
}
