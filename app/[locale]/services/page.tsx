import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/home/CtaBand";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return pageMetadata({ locale, path: "/services", title: t("kicker"), description: t("sub") });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const items = t.raw("items") as { title: string; body: string }[];
  const process = t.raw("process") as { title: string; body: string }[];

  return (
    <>
      <div className="container-x pt-36">
        <SectionHeading as="h1" kicker={t("kicker")} title={t("title")} sub={t("sub")} />

        <Reveal className="mt-16">
          <ul className="border-line bg-line grid gap-px overflow-hidden rounded-3xl border md:grid-cols-2 lg:grid-cols-3">
            {items.map((it, i) => (
              <li key={it.title} className="bg-bg group hover:bg-surface p-8 transition-colors">
                <span className="label">0{i + 1}</span>
                <h2 className="mt-5 text-2xl font-semibold">{it.title}</h2>
                <p className="text-muted mt-3">{it.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <section className="mt-32" aria-labelledby="process">
          <h2 id="process" className="text-[clamp(1.75rem,4vw,3rem)] font-semibold">
            {t("processTitle")}
          </h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-4">
            {process.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                delay={i * 0.07}
                className="border-line border-t-2 pt-6"
              >
                <span className="label text-accent-text">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-semibold">{p.title}</h3>
                <p className="text-muted mt-2 text-sm">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </section>
      </div>
      <div className="mt-32">
        <CtaBand />
      </div>
    </>
  );
}
