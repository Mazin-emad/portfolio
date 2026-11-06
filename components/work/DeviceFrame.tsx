import Image from "next/image";
import { cn } from "@/lib/utils";

/** CSS browser window around a desktop screenshot. Images are 1440x900. */
export function BrowserFrame({
  src,
  alt,
  priority,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "border-line-strong bg-surface overflow-hidden rounded-xl border shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)]",
        className,
      )}
    >
      <div
        className="border-line bg-surface-2 flex items-center gap-1.5 border-b px-3.5 py-2.5"
        aria-hidden
      >
        <span className="bg-line-strong size-2.5 rounded-full" />
        <span className="bg-line-strong size-2.5 rounded-full" />
        <span className="bg-line-strong size-2.5 rounded-full" />
        <span className="bg-bg ms-3 h-4 flex-1 rounded-full" />
      </div>
      <div className="relative aspect-[1440/900]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

/** CSS phone around a mobile screenshot. Images are 780 wide (≈ 390x844 @2x). */
export function PhoneFrame({
  src,
  alt,
  priority,
  className,
  sizes = "280px",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "border-line-strong bg-bg rounded-[2.25rem] border-[7px] shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)]",
        className,
      )}
    >
      <div className="relative aspect-[390/844] overflow-hidden rounded-[1.7rem]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}
