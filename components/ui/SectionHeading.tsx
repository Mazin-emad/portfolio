import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  kicker,
  title,
  sub,
  className,
  as: Tag = "h2",
}: {
  kicker?: string;
  title: string;
  sub?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {kicker && (
        <Reveal>
          <p className="label mb-5 flex items-center gap-3">
            <span className="bg-accent inline-block h-px w-8" aria-hidden />
            {kicker}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <Tag className="text-[clamp(2.25rem,6vw,4.5rem)] font-semibold whitespace-pre-line">
          {title}
        </Tag>
      </Reveal>
      {sub && (
        <Reveal delay={0.12}>
          <p className="text-muted mt-6 max-w-2xl text-lg">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}
