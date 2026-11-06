import { getTranslations, setRequestLocale } from "next-intl/server";
import { projects } from "@/content/projects";
import { archive } from "@/content/archive";
import type { Locale } from "@/content/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const skills = {
  frontend: ["Next.js", "React", "Angular", "TypeScript", "Tailwind CSS", "RxJS", "NgRx", "Vue.js", "RTL / Arabic UI"],
  backend: ["Laravel", "PHP", "Artisan", "Node.js", "Express", ".NET API integration", "PDF generation"],
  data: ["SQL", "MongoDB", "Supabase", "Firebase"],
  tools: ["Git", "Docker", "Figma", "PWA / IndexedDB", "Vercel", "Railway", "Claude"],
} as const;

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "journey" });
  return pageMetadata({ locale, path: "/journey", title: t("kicker"), description: t("sub") });
}

type Entry = { title: string; kind: string; role?: string; href?: string };

export default async function JourneyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations("journey");

  const byYear = new Map<string, Entry[]>();
  const add = (year: string, e: Entry) => byYear.set(year, [...(byYear.get(year) ?? []), e]);
  projects.forEach((p) => add(p.year.en.slice(0, 4), { title: p.title[l], kind: p.kind[l], role: p.role[l], href: `/work/${p.slug}` }));
  archive.forEach((a) => add(a.year.slice(0, 4), { title: a.title, kind: a.kind[l] }));
  const years = [...byYear.keys()].sort((a, b) => Number(b) - Number(a));

  return (
    <div className="container-x pt-36">
      <SectionHeading as="h1" kicker={t("kicker")} title={t("title")} sub={t("sub")} />

      <ol className="mt-20">
        {years.map((year) => (
          <Reveal as="li" key={year} className="border-line grid gap-6 border-t py-10 md:grid-cols-[180px_1fr]">
            <p className="font-display text-5xl font-semibold" dir="ltr">
              {year}
            </p>
            <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {byYear.get(year)!.map((e) => {
                const body = (
                  <>
                    <p className="font-medium">{e.title}</p>
                    <p className="text-muted mt-1 text-sm">
                      {e.kind}
                      {e.role ? ` · ${e.role}` : ""}
                    </p>
                  </>
                );
                return (
                  <li key={e.title} className="bg-bg">
                    {e.href ? (
                      <Link href={e.href} className="hover:bg-surface block p-5 transition-colors">
                        {body}
                      </Link>
                    ) : (
                      <div className="p-5">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ))}
      </ol>

      <section className="border-line mt-12 grid gap-10 border-t py-16 lg:grid-cols-[180px_1fr]" aria-labelledby="skills">
        <h2 id="skills" className="label lg:pt-2">
          {t("skills")}
        </h2>
        <div className="grid gap-10 sm:grid-cols-2">
          {(Object.keys(skills) as (keyof typeof skills)[]).map((g) => (
            <Reveal key={g}>
              <h3 className="text-xl font-semibold">{t(`groups.${g}`)}</h3>
              <ul className="mt-4 flex flex-wrap gap-2" dir="ltr">
                {skills[g].map((s) => (
                  <li key={s} className="border-line text-muted rounded-full border px-3 py-1 text-sm">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-line grid gap-6 border-t py-16 lg:grid-cols-[180px_1fr]">
        <h2 className="label lg:pt-2">{t("education")}</h2>
        <div>
          <p className="text-2xl font-semibold">{t("eduTitle")}</p>
          <p className="text-muted mt-2">{t("eduBody")}</p>
        </div>
      </section>
    </div>
  );
}
