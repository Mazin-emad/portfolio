"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { LangSwitch } from "./LangSwitch";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Mazin Emad"
      className={cn("font-display text-2xl font-bold", className)}
    >
      <span dir="ltr" className="inline-flex items-baseline">
        Mazin<span className="text-accent-text">.</span>
      </span>
    </Link>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("palette");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openFor, setOpenFor] = useState<string | null>(null);
  // The menu belongs to the page it was opened on, so navigating closes it without an effect.
  const open = openFor === pathname;
  const setOpen = (fn: boolean | ((v: boolean) => boolean)) =>
    setOpenFor((cur) => ((typeof fn === "function" ? fn(cur === pathname) : fn) ? pathname : null));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const desktopItems = navItems.filter((i) => i.key !== "home" && i.key !== "contact");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-line bg-bg/80 border-b backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {desktopItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition-colors",
                isActive(item.href) ? "text-fg bg-surface-2" : "text-muted hover:text-fg",
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-palette"))}
            aria-label={tc("open")}
            className="border-line text-muted hover:text-fg hover:border-line-strong hidden h-10 items-center gap-3 rounded-full border ps-4 pe-3 text-sm transition-colors sm:flex"
          >
            <Search size={15} aria-hidden />
            <span className="hidden xl:inline">{tc("open")}</span>
            <kbd className="border-line rounded-md border px-1.5 font-mono text-[11px]" dir="ltr">
              ⌘K
            </kbd>
          </button>
          <LangSwitch />
          <ThemeToggle />
          <Link
            href="/contact"
            className="bg-accent text-accent-ink hover:bg-fg hover:text-bg hidden h-10 items-center rounded-full px-5 text-sm font-medium transition-colors md:inline-flex"
          >
            {t("contact")}
          </Link>
          <button
            type="button"
            className="border-line grid size-10 place-items-center rounded-full border lg:hidden"
            aria-label={open ? t("close") : t("menu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-bg fixed inset-x-0 top-[72px] bottom-0 overflow-y-auto lg:hidden"
          >
            <ul className="container-x flex flex-col py-6">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.4 }}
                  className="border-line border-b"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "font-display flex items-center justify-between py-5 text-3xl font-semibold",
                      isActive(item.href) ? "text-accent-text" : "text-fg",
                    )}
                  >
                    {t(item.key)}
                    <span className="label">0{i + 1}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
