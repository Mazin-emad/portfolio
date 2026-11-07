import { getTranslations, setRequestLocale } from "next-intl/server";
import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ArchiveList } from "@/components/work/ArchiveList";
import { PageSchema } from "@/components/seo/PageSchema";
import { staticPageMetadata, urlFor } from "@/lib/seo";
import type { Locale } from "@/content/types";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return staticPageMetadata(locale, "/work", "work");
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("work");

  return (
    <div className="container-x pt-36 pb-12">
      <PageSchema
        locale={locale}
        path="/work"
        page="work"
        type="CollectionPage"
        extra={[
          {
            "@type": "ItemList",
            "@id": `${urlFor(locale, "/work")}#projects`,
            itemListElement: projects.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: urlFor(locale, `/work/${p.slug}`),
              name: p.title[locale as Locale],
            })),
          },
        ]}
      />
      <SectionHeading as="h1" kicker={t("flagship")} title={t("title")} sub={t("sub")} />
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.slug}
            project={p}
            index={i}
            size={i < 2 ? "lg" : "md"}
            heading="h2"
            priority={i === 0}
          />
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
