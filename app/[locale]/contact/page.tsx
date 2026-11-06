import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return pageMetadata({ locale, path: "/contact", title: t("kicker"), description: t("sub") });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  const links = [
    { label: "GitHub", href: site.github },
    { label: "LinkedIn", href: site.linkedin },
    { label: "X", href: site.twitter },
  ];

  return (
    <div className="container-x pt-36">
      <SectionHeading as="h1" kicker={t("kicker")} title={t("title")} sub={t("sub")} />

      <div className="mt-16 grid gap-16 lg:grid-cols-[1.3fr_0.7fr]">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.08}>
          <aside className="grid content-start gap-10">
            <div>
              <p className="label mb-3">{t("direct")}</p>
              <a
                href={`mailto:${site.email}`}
                className="link-u font-display text-xl font-medium sm:text-2xl"
                dir="ltr"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="label mb-3">{t("elsewhere")}</p>
              <ul className="grid gap-2">
                {links.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent-text inline-flex items-center gap-1.5 text-lg transition-colors"
                    >
                      {s.label}
                      <ArrowUpRight size={16} className="flip-rtl" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Reveal>
      </div>
    </div>
  );
}
