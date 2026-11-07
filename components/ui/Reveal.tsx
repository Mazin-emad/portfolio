"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Fades and lifts below-the-fold content in as it scrolls into view.
 * Plain CSS transition + one IntersectionObserver — no animation library to hydrate, so dozens of
 * these on a page cost almost nothing. Reduced motion shows everything immediately (see globals.css).
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Content already on screen stays put (it was server-rendered visible, so LCP never waits for JS);
    // only what sits below the fold is hidden, then revealed as it arrives.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    el.dataset.hide = "";
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          delete el.dataset.hide;
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = as as ElementType;
  return (
    <Comp
      ref={ref}
      className={className ? `reveal ${className}` : "reveal"}
      style={{ "--d": `${delay}s`, "--y": `${y}px` } as CSSProperties}
    >
      {children}
    </Comp>
  );
}
