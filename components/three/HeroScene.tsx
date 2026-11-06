"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useLocale } from "next-intl";
import type { SceneMode } from "./Scene";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

/** Real screenshots used on the floating 3D devices. */
const pairs = [
  { desktop: "/projects/alruaa/life-wheel-desktop.webp", mobile: "/projects/alruaa/home-mobile.webp" },
  { desktop: "/projects/elkhalily/hero-desktop.webp", mobile: "/projects/elkhalily/home-mobile.webp" },
];

function canWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Full-bleed WebGL backdrop for the hero.
 *  - reduced motion / no WebGL → nothing (CSS fallback shows)
 *  - narrow screens            → particle field only
 *  - wide screens              → particle field + floating laptop & phone
 * Rendering pauses when the hero is off screen or the tab is hidden.
 */
export function HeroScene() {
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<SceneMode | "none">("none");
  const [light, setLight] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 1024px)");
    const decide = () => {
      const next: SceneMode | "none" = reduce.matches || !canWebGL() ? "none" : wide.matches ? "full" : "particles";
      setMode(next);
      document.documentElement.dataset.scene = next;
    };
    decide();
    reduce.addEventListener("change", decide);
    wide.addEventListener("change", decide);
    return () => {
      reduce.removeEventListener("change", decide);
      wide.removeEventListener("change", decide);
      delete document.documentElement.dataset.scene;
    };
  }, []);

  useEffect(() => {
    const read = () => setLight(document.documentElement.dataset.theme === "light");
    read();
    window.addEventListener("themechange", read);
    return () => window.removeEventListener("themechange", read);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0">
      {mode !== "none" && (
        <Scene mode={mode} light={light} rtl={locale === "ar"} pairs={pairs} active={inView && tabVisible} />
      )}
    </div>
  );
}
