"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const CommandPalette = dynamic(() => import("./CommandPalette").then((m) => m.CommandPalette), {
  ssr: false,
});

/**
 * The ⌘K palette (and its project index) loads on first use instead of with every page.
 * The key press / button click that summons it opens it as soon as the chunk arrives.
 */
export function CommandPaletteLazy() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMounted(true);
      }
    };
    const onOpen = () => setMounted(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, [mounted]);

  return mounted ? <CommandPalette initialOpen /> : null;
}
