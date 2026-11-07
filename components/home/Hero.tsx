import { useTranslations } from "next-intl";
import { HeroScene } from "@/components/three/HeroScene";
import { PortraitStage } from "@/components/home/PortraitStage";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  const t = useTranslations("hero");

  const stats = [
    { v: "12K+", l: t("stat1") },
    { v: "20+", l: t("stat2") },
    { v: "2", l: t("stat3") },
  ];

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden />
      <div
        className="absolute start-1/2 -top-40 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full blur-3xl rtl:translate-x-1/2"
        style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
        aria-hidden
      />
      <HeroScene />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="rise">
            <p className="label border-line bg-surface/60 inline-flex items-center gap-2.5 rounded-full border px-4 py-2 backdrop-blur">
              <span className="relative flex size-2">
                <span className="bg-accent absolute inline-flex size-full animate-ping rounded-full opacity-70" />
                <span className="bg-accent relative inline-flex size-2 rounded-full" />
              </span>
              {t("kicker")}
            </p>
          </div>

          <h1 className="mt-8 text-[clamp(2.5rem,4.8vw,4.4rem)] font-semibold">
            <div className="rise" style={{ "--d": "0.05s" } as React.CSSProperties}>
              <span className="block">{t("line1")}</span>
            </div>
            <div className="rise" style={{ "--d": "0.12s" } as React.CSSProperties}>
              <span className="text-accent-text block">{t("line2")}</span>
            </div>
          </h1>

          <div className="rise" style={{ "--d": "0.2s" } as React.CSSProperties}>
            <p className="text-muted mt-8 max-w-xl text-lg leading-relaxed sm:text-xl">
              {t("sub")}
            </p>
          </div>

          <div className="rise" style={{ "--d": "0.28s" } as React.CSSProperties}>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/work">{t("ctaWork")}</ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                {t("ctaContact")}
              </ButtonLink>
            </div>
          </div>

          <div className="rise" style={{ "--d": "0.36s" } as React.CSSProperties}>
            <dl className="border-line mt-14 grid max-w-xl grid-cols-3 gap-6 border-t pt-8">
              {stats.map((s) => (
                <div key={s.l}>
                  <dt className="font-display text-3xl font-semibold sm:text-4xl" dir="ltr">
                    {s.v}
                  </dt>
                  <dd className="text-muted mt-1 text-xs leading-snug sm:text-sm">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <PortraitStage />
      </div>
    </section>
  );
}
