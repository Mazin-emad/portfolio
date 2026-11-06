import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Approach() {
  const t = useTranslations("approach");
  const items = t.raw("items") as { title: string; body: string }[];

  return (
    <section className="container-x py-24 sm:py-32">
      <SectionHeading kicker={t("kicker")} title={t("title")} />
      <ol className="border-line mt-16 grid border-t md:grid-cols-2">
        {items.map((it, i) => (
          <Reveal
            as="li"
            key={it.title}
            delay={(i % 2) * 0.06}
            className="border-line group border-b py-10 md:odd:border-e md:odd:pe-10 md:even:ps-10"
          >
            <span className="label">0{i + 1}</span>
            <h3 className="mt-4 text-2xl font-semibold sm:text-3xl">{it.title}</h3>
            <p className="text-muted mt-3 max-w-md">{it.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
