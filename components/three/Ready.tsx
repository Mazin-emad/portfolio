"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/** Fires once, after the first frame of its Canvas has actually rendered (textures and all). */
export function Ready({ onReady }: { onReady?: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    done.current = true;
    onReady?.();
  });
  return null;
}
