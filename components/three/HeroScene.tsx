"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import { useWake } from "./useWake";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export function canWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Full-bleed particle backdrop for the hero (cursor-reactive).
 *  - reduced motion / no WebGL: nothing
 *  - rendering pauses when the hero is off screen or the tab is hidden
 */
export function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [dense, setDense] = useState(false);
  const [light, setLight] = useState(false);
  const [inView, setInView] = useState(true);
  const awake = useWake();
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 1024px)");
    const decide = () => {
      setEnabled(!reduce.matches && canWebGL());
      setDense(wide.matches);
    };
    decide();
    reduce.addEventListener("change", decide);
    wide.addEventListener("change", decide);
    return () => {
      reduce.removeEventListener("change", decide);
      wide.removeEventListener("change", decide);
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
      {enabled && awake && <Scene light={light} dense={dense} active={inView && tabVisible} />}
    </div>
  );
}
