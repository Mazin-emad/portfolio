import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import portrait from "@/assets/eng-mazin2.jpeg";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return pageMetadata({ locale, path: "/about", title: t("kicker"), description: t("p1") });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const facts = t.raw("facts") as { label: string; value: string }[];

  return (
    <div className="container-x pt-36">
      <SectionHeading as="h1" kicker={t("kicker")} title={t("title")} />

      <div className="mt-16 grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div className="border-line bg-surface relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-[2rem] border lg:mx-0">
            <Image
              src={portrait}
              alt="Mazin Emad"
              fill
              priority
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover object-top"
              placeholder="blur"
            />
          </div>
        </Reveal>

        <div>
          <div className="space-y-6 text-xl leading-relaxed sm:text-2xl">
            {(["p1", "p2", "p3"] as const).map((k, i) => (
              <Reveal key={k} delay={i * 0.06}>
                <p className={i === 0 ? "" : "text-muted"}>{t(k)}</p>
              </Reveal>
            ))}
          </div>

          <dl className="border-line mt-12 grid gap-px overflow-hidden rounded-2xl border bg-line sm:grid-cols-2">
            {facts.map((f) => (
              <div key={f.label} className="bg-bg p-6">
                <dt className="label">{f.label}</dt>
                <dd className="mt-2 text-lg font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <ButtonLink href="/journey">{t("cta")}</ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
