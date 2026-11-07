import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { Locale, Project } from "@/content/types";
import { Reveal } from "@/components/ui/Reveal";

export async function ProjectCard({
  project,
  index,
  size = "md",
  priority = false,
  heading: Heading = "h3",
}: {
  project: Project;
  index: number;
  size?: "lg" | "md";
  /** Above-the-fold card: load its image eagerly with high priority (it can be the LCP). */
  priority?: boolean;
  /** Heading level, so the page outline never skips a level. */
  heading?: "h2" | "h3";
}) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("common");
  const status =
    project.status === "live"
      ? t("statusLive")
      : project.status === "in-progress"
        ? t("statusProgress")
        : t("statusPrivate");

  return (
    <Reveal delay={(index % 2) * 0.08} className={cn("h-full", size === "lg" && "md:col-span-2")}>
      <Link
        href={`/work/${project.slug}`}
        className="group border-line bg-surface hover:border-line-strong relative flex h-full flex-col overflow-hidden rounded-3xl border transition-colors duration-500"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: `radial-gradient(60% 50% at 50% 0%, ${project.hue}33, transparent 70%)`,
          }}
        />
        <div
          className={cn(
            "relative shrink-0 overflow-hidden",
            size === "lg" ? "aspect-[16/8]" : "aspect-[16/10]",
          )}
        >
          <Image
            src={project.cover}
            alt=""
            fill
            priority={priority}
            fetchPriority={priority ? "high" : undefined}
            sizes={
              size === "lg"
                ? "(min-width: 1024px) 1160px, 100vw"
                : "(min-width: 768px) 560px, 100vw"
            }
            className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          />
          <div
            className="from-surface absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent"
            aria-hidden
          />
        </div>
        <div className="relative flex flex-1 items-end justify-between gap-6 p-6 sm:p-8">
          <div className="min-w-0 flex-1">
            <div className="label mb-3 flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <p>
                <span>0{index + 1}</span>
                <span aria-hidden> · </span>
                <span>{project.kind[locale]}</span>
              </p>
              <p className="flex shrink-0 items-center gap-1.5">
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    project.status === "live"
                      ? "bg-emerald-400"
                      : project.status === "in-progress"
                        ? "bg-amber-400"
                        : "bg-muted",
                  )}
                  aria-hidden
                />
                {status}
              </p>
            </div>
            <Heading className="text-3xl font-semibold sm:text-4xl">
              {project.title[locale]}
            </Heading>
            <p className="text-muted mt-3 max-w-xl">{project.tagline[locale]}</p>
          </div>
          <span className="border-line-strong group-hover:bg-accent group-hover:text-accent-ink group-hover:border-accent grid size-12 shrink-0 place-items-center rounded-full border transition-colors duration-300">
            <ArrowUpRight size={20} className="flip-rtl" aria-hidden />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
