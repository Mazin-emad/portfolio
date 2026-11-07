"use client";

import { useEffect, useState } from "react";

/**
 * True once the visitor has shown a sign of life (move, touch, scroll, key).
 * Decorative 3D waits for this so three.js never competes with hydration and LCP; crawlers and
 * lab runs that never interact simply keep the static fallback.
 */
export function useWake() {
  const [awake, setAwake] = useState(false);
  useEffect(() => {
    const events = ["pointermove", "pointerdown", "scroll", "keydown", "touchstart"] as const;
    const wake = () => {
      setAwake(true);
      events.forEach((e) => window.removeEventListener(e, wake));
    };
    events.forEach((e) => window.addEventListener(e, wake, { passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, wake));
  }, []);
  return awake;
}
