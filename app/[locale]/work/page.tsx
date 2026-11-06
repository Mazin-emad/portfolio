import { getTranslations, setRequestLocale } from "next-intl/server";
import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ArchiveList } from "@/components/work/ArchiveList";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "work" });
  return pageMetadata({ locale, path: "/work", title: t("title"), description: t("sub") });
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("work");

  return (
    <div className="container-x pt-36 pb-12">
      <SectionHeading as="h1" kicker={t("flagship")} title={t("title")} sub={t("sub")} />
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} size={i < 2 ? "lg" : "md"} />
        ))}
      </div>

      <div className="mt-32">
        <SectionHeading kicker="—" title={t("archiveTitle")} sub={t("archiveSub")} />
        <div className="mt-12">
          <ArchiveList />
        </div>
      </div>
    </div>
  );
}
