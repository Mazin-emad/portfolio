"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LangSwitch({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const pathname = usePathname();
  const router = useRouter();
  const other = locale === "ar" ? "en" : "ar";

  return (
    <button
      type="button"
      lang={other}
      aria-label={t("languageLabel")}
      onClick={() => {
        router.replace(pathname, { locale: other });
      }}
      className={`border-line text-fg hover:border-line-strong h-10 rounded-full border px-4 text-sm font-medium transition-colors ${className}`}
    >
      {t("language")}
    </button>
  );
}
