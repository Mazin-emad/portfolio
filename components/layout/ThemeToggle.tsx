"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const t = useTranslations("common");

  const toggle = () => {
    const el = document.documentElement;
    const next = el.dataset.theme === "light" ? "dark" : "light";
    el.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    window.dispatchEvent(new Event("themechange"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("theme")}
      className="border-line text-fg hover:border-line-strong grid size-10 place-items-center rounded-full border transition-colors"
    >
      <Sun size={17} className="hidden dark:block" aria-hidden />
      <Moon size={17} className="dark:hidden" aria-hidden />
    </button>
  );
}
