import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBand() {
  const t = useTranslations("cta");
  return (
    <section className="container-x pb-8">
      <Reveal>
        <div className="border-line bg-surface relative overflow-hidden rounded-[2rem] border px-6 py-20 text-center sm:px-16 sm:py-28">
          <div
            className="absolute inset-0 -z-0"
            style={{ background: "radial-gradient(60% 80% at 50% 120%, var(--glow), transparent)" }}
            aria-hidden
          />
          <h2 className="relative mx-auto max-w-3xl text-[clamp(2.25rem,6vw,4.75rem)] font-semibold">
            {t("title")}
          </h2>
          <p className="text-muted relative mx-auto mt-6 max-w-xl text-lg">{t("sub")}</p>
          <div className="relative mt-10 flex justify-center">
            <ButtonLink href="/contact">{t("button")}</ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
