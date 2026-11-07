"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

/** One parallax layer: moves `depth` px per unit of pointer offset (negative = behind, moves against). */
function useLayer(x: MotionValue<number>, y: MotionValue<number>, depth: number) {
  return {
    x: useTransform(x, (v) => v * depth),
    y: useTransform(y, (v) => v * depth * 0.6),
  };
}

/**
 * The hero's right-hand side: an editorial portrait.
 * Back → front: giant outlined name, a lit backdrop disc, the cut-out photo (mono + lime rim light),
 * floating tags. The layers shift by different amounts with the cursor, which gives the stage depth.
 * Pure CSS/DOM — no WebGL, works the same everywhere; reduced motion keeps everything still.
 */
export function PortraitStage() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 70, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 70, damping: 18, mass: 0.6 });

  const back = useLayer(sx, sy, -22);
  const disc = useLayer(sx, sy, -9);
  const photo = useLayer(sx, sy, 8);
  const front = useLayer(sx, sy, 26);
  const tilt = useTransform(sx, (v) => v * 1.6);

  useEffect(() => {
    if (reduce) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // -1…1 around the stage centre, softly clamped so far-away cursors don't over-shift
      const nx = Math.tanh(((e.clientX - (r.left + r.width / 2)) / r.width) * 1.6);
      const ny = Math.tanh(((e.clientY - (r.top + r.height / 2)) / r.height) * 1.6);
      px.set(nx);
      py.set(ny);
    };
    const leave = () => {
      px.set(0);
      py.set(0);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [reduce, px, py]);

  const chips = [
    { k: "chip1", cls: "top-[18%] start-0 sm:start-[-4%]", delay: "0s" },
    { k: "chip2", cls: "hidden sm:block top-[50%] end-[-6%]", delay: "-2.2s" },
    { k: "chip3", cls: "bottom-[14%] start-[2%] sm:start-[-2%]", delay: "-4.1s" },
  ] as const;

  return (
    <div
      ref={ref}
      className="group/portrait relative mx-auto aspect-[4/5] w-full max-w-[360px] sm:max-w-[440px] lg:max-w-[520px]"
    >
      {/* 1 · giant outlined name */}
      <motion.div
        style={back}
        className="pointer-events-none absolute inset-x-[-8%] top-[4%] -z-20 flex justify-center select-none"
        aria-hidden
      >
        <span className="portrait-name font-display text-[clamp(5rem,22vw,9.75rem)] leading-none font-semibold tracking-tight">
          {t("nameMark")}
        </span>
      </motion.div>

      {/* 2 · lit disc behind the shoulders */}
      <motion.div style={disc} className="absolute inset-0 -z-10" aria-hidden>
        <div
          className="absolute inset-x-[4%] top-[22%] aspect-square rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 38%, var(--glow) 0%, transparent 62%), radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--surface) 70%, transparent) 0%, transparent 70%)",
          }}
        />
        <div className="border-line absolute inset-x-[4%] top-[22%] aspect-square rounded-full border" />
        <div className="border-line absolute inset-x-[-4%] top-[14%] aspect-square rounded-full border border-dashed opacity-60" />
      </motion.div>

      {/* 3 · the photo */}
      <motion.div style={{ ...photo, rotate: tilt }} className="portrait-fade absolute inset-0">
        <div
          className="rise absolute inset-0"
          style={{ "--d": "0.1s", "--rise-y": "28px" } as React.CSSProperties}
        >
          <Image
            src="/portrait/mazin-cutout.webp"
            alt={t("portraitAlt")}
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 1024px) 520px, 92vw"
            className="portrait-photo object-contain object-bottom"
          />
        </div>
      </motion.div>

      {/* 4 · floating tags */}
      <motion.div style={front} className="pointer-events-none absolute inset-0">
        {chips.map((c) => (
          <span
            key={c.k}
            className={`float-chip border-line-strong bg-surface/70 label absolute rounded-full border px-3 py-1.5 text-[0.65rem] backdrop-blur-md sm:px-3.5 sm:py-2 sm:text-xs ${c.cls}`}
            style={{ animationDelay: c.delay }}
          >
            {t(c.k)}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
