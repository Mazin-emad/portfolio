"use client";

import { useEffect, useRef, useState } from "react";

function canWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Decides whether a 3D stage may render and whether it should be animating.
 *  - `enabled`: WebGL exists, motion isn't reduced, and the stage has been near the viewport
 *  - `active`: on screen and the tab is visible (otherwise the render loop is paused)
 * Until `enabled` is true, callers show their static fallback.
 */
export function useStage<T extends HTMLElement>(rootMargin = "320px") {
  const ref = useRef<T>(null);
  const [capable, setCapable] = useState(false);
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setCapable(!reduce.matches && canWebGL());
    decide();
    reduce.addEventListener("change", decide);
    return () => reduce.removeEventListener("change", decide);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nearIo = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), {
      rootMargin,
    });
    const viewIo = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0,
    });
    nearIo.observe(el);
    viewIo.observe(el);
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      nearIo.disconnect();
      viewIo.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [rootMargin]);

  return { ref, enabled: capable && near, active: inView && tabVisible };
}
