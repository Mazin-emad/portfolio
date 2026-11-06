"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CornerDownLeft, FileText, Languages, Mail, Moon, Search, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { navItems, site } from "@/lib/site";
import { projects } from "@/content/projects";
import type { Locale } from "@/content/types";
import { cn } from "@/lib/utils";

type Item = {
  id: string;
  group: "pages" | "projects" | "actions";
  label: string;
  hint?: string;
  icon: React.ReactNode;
  run: () => void;
};

export function CommandPalette() {
  const locale = useLocale() as Locale;
  const t = useTranslations("palette");
  const tn = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") close();
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, [close]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => inputRef.current?.focus());
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => {
      close();
      router.push(href);
    };
    const pages: Item[] = navItems.map((n) => ({
      id: `page-${n.key}`,
      group: "pages",
      label: tn(n.key),
      icon: <FileText size={16} />,
      run: go(n.href),
    }));
    const projs: Item[] = projects.map((p) => ({
      id: `project-${p.slug}`,
      group: "projects",
      label: p.title[locale],
      hint: p.kind[locale],
      icon: <Sparkles size={16} />,
      run: go(`/work/${p.slug}`),
    }));
    const actions: Item[] = [
      {
        id: "theme",
        group: "actions",
        label: t("toggleTheme"),
        icon: <Moon size={16} />,
        run: () => {
          const el = document.documentElement;
          const next = el.dataset.theme === "light" ? "dark" : "light";
          el.dataset.theme = next;
          try {
            localStorage.setItem("theme", next);
          } catch {}
          window.dispatchEvent(new Event("themechange"));
          close();
        },
      },
      {
        id: "lang",
        group: "actions",
        label: t("switchLang"),
        hint: locale === "ar" ? "English" : "العربية",
        icon: <Languages size={16} />,
        run: () => {
          close();
          router.replace(pathname, { locale: locale === "ar" ? "en" : "ar" });
        },
      },
      {
        id: "email",
        group: "actions",
        label: t("email"),
        hint: site.email,
        icon: <Mail size={16} />,
        run: () => {
          close();
          window.location.href = `mailto:${site.email}`;
        },
      },
    ];
    return [...pages, ...projs, ...actions];
  }, [locale, t, tn, router, pathname, close]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ""}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    }
  };

  const groupLabel = (g: Item["group"]) => t(g);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t("open")}
            initial={{ y: 12, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-surface border-line-strong relative w-full max-w-xl overflow-hidden rounded-2xl border shadow-2xl"
            onKeyDown={onKeyDown}
          >
            <div className="border-line flex items-center gap-3 border-b px-4">
              <Search size={18} className="text-muted" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder={t("placeholder")}
                aria-label={t("placeholder")}
                className="placeholder:text-muted h-14 flex-1 bg-transparent text-base outline-none"
              />
              <kbd className="border-line text-muted rounded-md border px-1.5 font-mono text-[11px]">
                esc
              </kbd>
            </div>
            <ul ref={listRef} role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="text-muted px-3 py-8 text-center text-sm">{t("empty")}</li>
              )}
              {filtered.map((item, i) => {
                const showGroup = i === 0 || filtered[i - 1].group !== item.group;
                return (
                  <li key={item.id} role="presentation">
                    {showGroup && (
                      <p className="label px-3 pt-3 pb-1.5">{groupLabel(item.group)}</p>
                    )}
                    <button
                      type="button"
                      role="option"
                      aria-selected={i === active}
                      data-index={i}
                      onMouseMove={() => setActive(i)}
                      onClick={item.run}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start text-sm transition-colors",
                        i === active ? "bg-surface-2 text-fg" : "text-muted",
                      )}
                    >
                      <span className={cn(i === active && "text-accent-text")}>{item.icon}</span>
                      <span className="flex-1">{item.label}</span>
                      {item.hint && <span className="label hidden sm:inline">{item.hint}</span>}
                      {i === active && (
                        <CornerDownLeft size={14} className="text-muted" aria-hidden />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="border-line text-muted border-t px-4 py-2.5 text-xs">{t("hint")}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
