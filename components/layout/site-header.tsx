"use client";

import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { NAV_LINKS } from "@/data/navigation";
import { PROFILE } from "@/data/profile";
import { MENU_EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useSiteMenu } from "./use-site-menu";

interface MenuButtonProps extends ComponentPropsWithoutRef<"button"> {
  open: boolean;
}

function MenuButton({ open, className, ...props }: MenuButtonProps) {
  const Icon = open ? X : Menu;
  return (
    <button
      type="button"
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 text-base text-foreground-secondary outline-none transition-colors hover:text-foreground-primary focus-visible:text-foreground-primary",
        className,
      )}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="site-menu-panel"
      {...props}
    >
      <Icon className="size-[18px]" strokeWidth={1.5} aria-hidden />
      <span>Menu</span>
    </button>
  );
}

export function SiteHeader() {
  const menu = useSiteMenu();

  return (
    <header className="sticky top-0 z-50 w-full bg-background-primary">
      <div className="relative border-b border-button-secondary-background">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-10 py-4 md:px-0">
          <Link
            href="/"
            className="text-base text-foreground-secondary transition-colors hover:text-foreground-primary"
          >
            {PROFILE.brand}
          </Link>
          <MenuButton open={menu.open} onClick={menu.toggle} />
        </div>

        {/* Overlay panel below the bar: absolutely positioned so opening drops
            it over the page content instead of pushing it down. */}
        <AnimatePresence initial={false} onExitComplete={menu.handleExitComplete}>
          {menu.open && (
            <motion.div
              id="site-menu-panel"
              key="site-menu-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: menu.closingForNav ? 0 : 0.2, ease: MENU_EASE }}
              className="absolute left-0 top-full w-full overflow-hidden border-b border-button-secondary-background bg-background-primary"
            >
              <nav aria-label="Site navigation" className="pb-4">
                {NAV_LINKS.map(({ href, label }, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: MENU_EASE }}
                  >
                    <div className="mx-auto w-full max-w-3xl px-10 md:px-0">
                      <a
                        href={href}
                        onClick={(event) => menu.handleNavClick(event, href)}
                        className={cn(
                          "block py-2 text-right text-base text-foreground-secondary transition-colors hover:text-foreground-primary",
                          index < NAV_LINKS.length - 1 &&
                            "border-b border-button-secondary-background",
                        )}
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
