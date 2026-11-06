"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Locale, Shot } from "@/content/types";
import { BrowserFrame, PhoneFrame } from "./DeviceFrame";
import { Reveal } from "@/components/ui/Reveal";

export function Gallery({ shots, title }: { shots: Shot[]; title: string }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("project");
  const [open, setOpen] = useState<number | null>(null);

  const desktop = shots.map((s, i) => ({ s, i })).filter((x) => x.s.kind === "desktop");
  const mobile = shots.map((s, i) => ({ s, i })).filter((x) => x.s.kind === "mobile");

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((v) => (v === null ? v : (v + (locale === "ar" ? -1 : 1) + shots.length) % shots.length));
      if (e.key === "ArrowLeft") setOpen((v) => (v === null ? v : (v + (locale === "ar" ? 1 : -1) + shots.length) % shots.length));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, shots.length, locale]);

  const current = open !== null ? shots[open] : null;
  const step = (d: number) => setOpen((v) => (v === null ? v : (v + d + shots.length) % shots.length));

  return (
    <div>
      {desktop.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {desktop.map(({ s, i }, n) => (
            <Reveal key={s.src} delay={(n % 2) * 0.06} className={n === 0 ? "md:col-span-2" : ""}>
              <figure>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="block w-full cursor-zoom-in text-start transition-transform duration-500 hover:-translate-y-1"
                  aria-label={`${s.caption[locale]} — ${t("gallery")}`}
                >
                  <BrowserFrame
                    src={s.src}
                    alt={`${title} — ${s.caption[locale]}`}
                    sizes={n === 0 ? "(min-width: 1240px) 1160px, 100vw" : "(min-width: 768px) 570px, 100vw"}
                  />
                </button>
                <figcaption className="label mt-3">{s.caption[locale]}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      )}

      {mobile.length > 0 && (
        <div className="mt-16">
          <p className="label mb-6">{t("mobile")}</p>
          <ul className="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            {mobile.map(({ s, i }) => (
              <li key={s.src} className="w-[220px] shrink-0 snap-center sm:w-[240px]">
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="block w-full cursor-zoom-in transition-transform duration-500 hover:-translate-y-1"
                  aria-label={`${s.caption[locale]} — ${t("gallery")}`}
                >
                  <PhoneFrame src={s.src} alt={`${title} — ${s.caption[locale]}`} sizes="240px" />
                </button>
                <p className="label mt-3">{s.caption[locale]}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.caption[locale]}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <button
              type="button"
              className="absolute end-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Close"
              onClick={() => setOpen(null)}
            >
              <X size={20} />
            </button>
            {shots.length > 1 && (
              <>
                <button
                  type="button"
                  className="absolute start-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                  aria-label="Previous"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                >
                  <ChevronLeft size={22} className="flip-rtl" />
                </button>
                <button
                  type="button"
                  className="absolute end-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                  aria-label="Next"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                >
                  <ChevronRight size={22} className="flip-rtl" />
                </button>
              </>
            )}
            <figure className="relative max-h-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
              <div
                className="relative mx-auto"
                style={{
                  width: current.kind === "mobile" ? "min(380px, 80vw)" : "min(1200px, 92vw)",
                  aspectRatio: current.kind === "mobile" ? "390/844" : "1440/900",
                  maxHeight: "82vh",
                }}
              >
                <Image
                  key={current.src}
                  src={current.src}
                  alt={current.caption[locale]}
                  fill
                  sizes="1200px"
                  className="rounded-xl object-contain"
                />
              </div>
              <figcaption className="mt-3 text-center text-sm text-white/70">{current.caption[locale]}</figcaption>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
