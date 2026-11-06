"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useLocale } from "next-intl";
import { useStage } from "@/components/three/useStage";
import { BrowserFrame, PhoneFrame } from "./DeviceFrame";

const DevicesCanvas = dynamic(() => import("@/components/three/DevicesCanvas"), { ssr: false });

/**
 * A project's real screenshots on a floating laptop (+ phone when there are mobile shots).
 * The CSS mockup is the SSR / reduced-motion / no-WebGL fallback and reserves the same space.
 */
export function DeviceShowcase({
  title,
  desktop,
  mobile,
}: {
  title: string;
  desktop: string[];
  mobile: string[];
}) {
  const rtl = useLocale() === "ar";
  const { ref, enabled, active } = useStage<HTMLDivElement>();
  const [ready, setReady] = useState(false);
  const live = enabled && ready;
  const hasPhone = mobile.length > 0;

  return (
    <div
      ref={ref}
      className="relative mx-auto flex h-[clamp(340px,52vw,620px)] w-full max-w-[1160px] items-center justify-center"
    >
      <div
        className={`relative w-[min(100%,820px)] transition-opacity duration-500 ${live ? "opacity-0" : "opacity-100"}`}
      >
        <BrowserFrame
          src={desktop[0]}
          alt={title}
          priority
          sizes="(min-width: 1024px) 820px, 100vw"
        />
        {hasPhone && (
          <PhoneFrame
            src={mobile[0]}
            alt={`${title} (mobile)`}
            className="absolute -start-1 -bottom-6 w-[22%] min-w-[84px] sm:-start-6"
            sizes="160px"
          />
        )}
      </div>

      {enabled && (
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${live ? "opacity-100" : "opacity-0"}`}
          aria-hidden
        >
          <DevicesCanvas
            desktop={desktop}
            mobile={mobile}
            rtl={rtl}
            active={active}
            onReady={() => setReady(true)}
          />
        </div>
      )}
    </div>
  );
}
