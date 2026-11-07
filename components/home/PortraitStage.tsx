"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useStage } from "@/components/three/useStage";

const Portrait = dynamic(() => import("@/components/three/Portrait"), { ssr: false });

function useLightTheme() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const read = () => setLight(document.documentElement.dataset.theme === "light");
    read();
    window.addEventListener("themechange", read);
    return () => window.removeEventListener("themechange", read);
  }, []);
  return light;
}

/**
 * The hero's right-hand side: Mazin's photo rebuilt from particles that react to the cursor.
 * A pre-rendered poster of the assembled portrait (one per theme) is always in the DOM, so there
 * is no layout shift, and it is what reduced-motion / no-WebGL visitors see.
 * The live canvas fades in over it while its particles settle into place.
 */
export function PortraitStage() {
  const t = useTranslations("hero");
  const { ref, enabled, active } = useStage<HTMLDivElement>("0px");
  const light = useLightTheme();
  const [ready, setReady] = useState(false);
  const live = enabled && ready;

  const chips = [
    { k: "chip1", cls: "top-[3%] start-0 sm:top-[14%] sm:start-[2%]", delay: "0s" },
    { k: "chip2", cls: "hidden sm:block top-[46%] end-[-6%]", delay: "-2.2s" },
    {
      k: "chip3",
      cls: "bottom-[8%] end-0 sm:end-auto sm:bottom-[24%] sm:start-[0%]",
      delay: "-4.1s",
    },
  ] as const;

  const poster = `object-cover object-top transition-opacity duration-[1200ms] ${live ? "opacity-0" : "opacity-100"}`;

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-[4/5] w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[520px]"
    >
      {/* halo behind the head */}
      <div
        className="absolute inset-x-[8%] top-[2%] bottom-[30%] -z-10 rounded-full opacity-80 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--glow), transparent 75%)" }}
        aria-hidden
      />
      <div
        className="border-line absolute inset-[-2%] -z-10 rounded-full border border-dashed opacity-50"
        aria-hidden
      />

      <div className="portrait-fade absolute inset-0">
        <Image
          src="/portrait/poster-dark.webp"
          alt={t("portraitAlt")}
          fill
          priority
          sizes="(min-width: 1024px) 520px, 92vw"
          className={`hidden dark:block ${poster}`}
        />
        <Image
          src="/portrait/poster-light.webp"
          alt={t("portraitAlt")}
          fill
          sizes="(min-width: 1024px) 520px, 92vw"
          className={`dark:hidden ${poster}`}
        />
        {enabled && (
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${live ? "opacity-100" : "opacity-0"}`}
            aria-hidden
          >
            <Portrait active={active} light={light} onReady={() => setReady(true)} />
          </div>
        )}
      </div>

      {chips.map((c) => (
        <span
          key={c.k}
          className={`float-chip border-line-strong bg-surface/70 label absolute rounded-full border px-3 py-1.5 text-[0.65rem] backdrop-blur-md sm:px-3.5 sm:py-2 sm:text-xs ${c.cls}`}
          style={{ animationDelay: c.delay }}
        >
          {t(c.k)}
        </span>
      ))}
    </div>
  );
}
