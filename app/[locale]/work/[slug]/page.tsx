import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getProject, projects, projectSlugs } from "@/content/projects";
import type { Locale } from "@/content/types";
import { BrowserFrame } from "@/components/work/DeviceFrame";
import { Gallery } from "@/components/work/Gallery";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ButtonLink, ExternalLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projectSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const l = locale as Locale;
  return pageMetadata({
    locale,
    path: `/work/${slug}`,
    title: `${project.title[l]} — ${project.kind[l]}`,
    description: project.summary[l],
    image: project.cover,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();

  const l = locale as Locale;
  const t = await getTranslations("project");
  const tc = await getTranslations("common");

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  const status =
    project.status === "live" ? tc("statusLive") : project.status === "in-progress" ? tc("statusProgress") : tc("statusPrivate");

  const meta = [
    { k: tc("role"), v: project.role[l] },
    { k: tc("year"), v: project.year[l] },
    { k: tc("status"), v: status },
  ];

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title[l],
          description: project.summary[l],
          author: { "@type": "Person", name: site.name },
          dateCreated: project.year.en.slice(0, 4),
          inLanguage: locale,
          image: `${site.url}${project.cover}`,
          keywords: project.stack.join(", "),
        }}
      />

      {/* Hero */}
      <header className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40">
        <div
          className="absolute inset-x-0 top-0 -z-10 h-[620px]"
          style={{ background: `radial-gradient(55% 60% at 50% 0%, ${project.hue}30, transparent 72%)` }}
          aria-hidden
        />
        <div className="container-x">
          <Link href="/work" className="text-muted hover:text-fg inline-flex items-center gap-2 text-sm transition-colors">
            <ArrowLeft size={16} className="flip-rtl" aria-hidden />
            {tc("back")}
          </Link>

          <Reveal>
            <p className="label mt-10">{project.kind[l]}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 text-[clamp(3rem,10vw,8rem)] font-semibold">{project.title[l]}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted mt-6 max-w-3xl text-xl sm:text-2xl">{project.tagline[l]}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="border-line mt-12 grid gap-8 border-t pt-8 sm:grid-cols-3">
              {meta.map((m) => (
                <div key={m.k}>
                  <dt className="label">{m.k}</dt>
                  <dd className="mt-2 text-lg font-medium">{m.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              {project.links.live && !project.links.liveNote && (
                <ExternalLink href={project.links.live} variant="primary">
                  {tc("liveSite")}
                </ExternalLink>
              )}
              {project.links.live && project.links.liveNote && (
                <span className="text-muted border-line rounded-full border px-5 py-2.5 text-sm">{project.links.liveNote[l]}</span>
              )}
              {!project.links.live && project.links.liveNote && (
                <span className="text-muted border-line rounded-full border px-5 py-2.5 text-sm">{project.links.liveNote[l]}</span>
              )}
              {project.links.github && <ExternalLink href={project.links.github}>{tc("sourceCode")}</ExternalLink>}
              {!project.links.github && project.links.sourceNote && (
                <span className="text-muted text-sm">{project.links.sourceNote[l]}</span>
              )}
            </div>
          </Reveal>
        </div>

        <div className="container-x mt-16">
          <Reveal y={40}>
            <BrowserFrame src={project.cover} alt={project.title[l]} priority sizes="(min-width: 1240px) 1160px, 100vw" />
          </Reveal>
        </div>
      </header>

      {/* Numbers */}
      {project.stats && (
        <section className="container-x py-12" aria-label={t("numbers")}>
          <dl
            className="border-line grid grid-cols-2 gap-px overflow-hidden rounded-3xl border bg-line lg:grid-cols-[repeat(var(--n),minmax(0,1fr))]"
            style={{ "--n": project.stats.length } as React.CSSProperties}
          >
            {project.stats.map((s) => (
              <Reveal key={s.value + s.label.en} className="bg-bg p-6 sm:p-8 [&:last-child:nth-child(odd)]:col-span-2 lg:[&:last-child:nth-child(odd)]:col-span-1">
                <dt className="font-display text-[clamp(1.5rem,2.8vw,2.5rem)] font-semibold whitespace-nowrap" dir="ltr">
                  {s.value}
                </dt>
                <dd className="text-muted mt-2 text-sm">{s.label[l]}</dd>
              </Reveal>
            ))}
          </dl>
        </section>
      )}

      {/* Overview */}
      <section className="container-x grid gap-10 py-20 lg:grid-cols-[1fr_2fr]">
        <p className="label lg:pt-2">{t("overview")}</p>
        <div className="space-y-6">
          {project.overview[l].map((para, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-xl leading-relaxed sm:text-2xl">{para}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What I built */}
      <section className="container-x py-12">
        <p className="label mb-8">{t("built")}</p>
        <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2">
          {project.highlights[l].map((h, i) => (
            <Reveal as="li" key={h.title} delay={(i % 2) * 0.05} className="bg-bg p-7 sm:p-9 md:[&:last-child:nth-child(odd)]:col-span-2">
              <span className="label">0{i + 1}</span>
              <h3 className="mt-4 text-xl font-semibold sm:text-2xl">{h.title}</h3>
              <p className="text-muted mt-3">{h.body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Technical notes */}
      {project.decisions && (
        <section className="container-x grid gap-10 py-20 lg:grid-cols-[1fr_2fr]">
          <p className="label lg:pt-2">{t("decisions")}</p>
          <ul className="space-y-10">
            {project.decisions[l].map((d) => (
              <Reveal as="li" key={d.title} className="border-line border-s-2 ps-6" >
                <h3 className="text-xl font-semibold">{d.title}</h3>
                <p className="text-muted mt-2">{d.body}</p>
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      {/* Stack */}
      <section className="container-x py-12">
        <p className="label mb-6">{t("stackTitle")}</p>
        <ul className="flex flex-wrap gap-2.5" dir="ltr">
          {project.stack.map((s) => (
            <li key={s} className="border-line-strong rounded-full border px-4 py-2 text-sm">
              {s}
            </li>
          ))}
        </ul>
      </section>

      {/* Gallery */}
      <section className="container-x py-20">
        <p className="label mb-8">{t("gallery")}</p>
        <Gallery shots={project.shots} title={project.title[l]} />
      </section>

      {/* Next */}
      <section className="container-x pt-8 pb-4">
        <p className="label mb-6">{t("nextTitle")}</p>
        <div className="grid">
          <ProjectCard project={next} index={(idx + 1) % projects.length} size="lg" />
        </div>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/contact" variant="ghost">
            {tc("letsTalk")}
          </ButtonLink>
        </div>
      </section>
    </article>
  );
}
