import { useTranslations } from "next-intl";
import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectCard } from "@/components/work/ProjectCard";

export function FeaturedWork() {
  const t = useTranslations("featured");
  const tc = useTranslations("common");

  return (
    <section className="container-x py-24 sm:py-32" aria-labelledby="featured-title">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading kicker={t("kicker")} title={t("title")} sub={t("sub")} />
        <ButtonLink href="/work" variant="ghost" className="self-start md:self-auto">
          {tc("viewAll")}
        </ButtonLink>
      </div>
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} size={i < 2 ? "lg" : "md"} />
        ))}
      </div>
    </section>
  );
}
