import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-[transform,background-color,color,border-color] duration-300 active:scale-[0.97]";

const variants = {
  primary: "bg-accent text-accent-ink hover:bg-fg hover:text-bg",
  ghost: "border border-line-strong text-fg hover:border-fg",
} as const;

type Variant = keyof typeof variants;

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className,
  ...rest
}: { href: ComponentProps<typeof Link>["href"]; variant?: Variant; children: ReactNode } & Omit<
  ComponentProps<typeof Link>,
  "href"
>) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)} {...rest}>
      {children}
      <ArrowUpRight
        size={16}
        className="flip-rtl transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
        aria-hidden
      />
    </Link>
  );
}

export function ExternalLink({
  href,
  variant = "ghost",
  children,
  className,
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, variants[variant], className)}
    >
      {children}
      <ArrowUpRight
        size={16}
        className="flip-rtl transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
        aria-hidden
      />
    </a>
  );
}
