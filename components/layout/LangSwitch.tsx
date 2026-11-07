"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

/**
 * A real link to the same page in the other language (crawlable, middle-clickable, works without
 * JS). The visible text is the language's own name, which is also its accessible name.
 */
export function LangSwitch({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const pathname = usePathname();
  const other = locale === "ar" ? "en" : "ar";

  return (
    <Link
      href={pathname}
      locale={other}
      lang={other}
      hrefLang={other}
      scroll={false}
      className={`border-line text-fg hover:border-line-strong inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors ${className}`}
    >
      {t("language")}
    </Link>
  );
}
