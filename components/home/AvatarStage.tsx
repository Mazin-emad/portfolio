"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useStage } from "@/components/three/useStage";

const Avatar = dynamic(() => import("@/components/three/Avatar"), { ssr: false });

/**
 * The hero's right-hand side: a 3D portrait that follows the cursor.
 * A pre-rendered poster of the same avatar is always in the DOM, so there is no layout shift,
 * and it is what reduced-motion / no-WebGL visitors see. The live canvas fades in over it.
 */
export function AvatarStage() {
  const t = useTranslations("hero");
  const { ref, enabled, active } = useStage<HTMLDivElement>("0px");
  const [ready, setReady] = useState(false);
  const live = enabled && ready;

  const chips = [
    { k: "chip1", cls: "top-[3%] start-0 sm:top-[14%] sm:start-[-6%]", delay: "0s" },
    { k: "chip2", cls: "hidden sm:block top-[46%] end-[-8%]", delay: "-2.2s" },
    {
      k: "chip3",
      cls: "bottom-[8%] end-0 sm:end-auto sm:bottom-[20%] sm:start-[-4%]",
      delay: "-4.1s",
    },
  ] as const;

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-[4/5] w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[540px]"
    >
      {/* halo behind the head */}
      <div
        className="absolute inset-[6%] -z-10 rounded-full opacity-90 blur-2xl"
        style={{ background: "radial-gradient(closest-side, var(--glow), transparent 75%)" }}
        aria-hidden
      />
      <div className="border-line absolute inset-[9%] -z-10 rounded-full border" aria-hidden />
      <div
        className="border-line absolute inset-[-1%] -z-10 rounded-full border border-dashed opacity-60"
        aria-hidden
      />

      {/* portrait: poster + live canvas, softly faded at the bottom edge */}
      <div className="avatar-fade absolute inset-0">
        <Image
          src="/avatar/poster.webp"
          alt={t("avatarAlt")}
          fill
          priority
          sizes="(min-width: 1024px) 540px, 92vw"
          className={`object-cover object-top transition-opacity duration-700 ${live ? "opacity-0" : "opacity-100"}`}
        />
        {enabled && (
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${live ? "opacity-100" : "opacity-0"}`}
            aria-hidden
          >
            <Avatar active={active} onReady={() => setReady(true)} />
          </div>
        )}
      </div>

      {/* floating tags */}
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
