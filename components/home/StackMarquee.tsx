import { useTranslations } from "next-intl";
import { stackList } from "@/lib/site";

export function StackMarquee() {
  const t = useTranslations("stackSection");
  const row = [...stackList, ...stackList];

  return (
    <section aria-label={t("kicker")} className="border-line border-y py-8">
      <div className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]" dir="ltr">
        <ul className="marquee-track font-display flex gap-12 text-3xl font-semibold sm:text-5xl">
          {row.map((name, i) => (
            <li key={`${name}-${i}`} className="text-outline flex items-center gap-12 whitespace-nowrap" aria-hidden={i >= stackList.length}>
              {name}
              <span className="bg-accent size-2 rounded-full" aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
