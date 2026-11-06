import { Globe, Monitor, Server, Smartphone } from "lucide-react";
import type { Locale, Project } from "@/content/types";
import { Reveal } from "@/components/ui/Reveal";

const icons = { web: Globe, mobile: Smartphone, desktop: Monitor } as const;

/** "One system, many platforms": client apps stacked on a shared backend. */
export function Platforms({
  data,
  locale,
}: {
  data: NonNullable<Project["platforms"]>;
  locale: Locale;
}) {
  return (
    <div>
      <Reveal>
        <h2 className="max-w-2xl text-[clamp(1.75rem,4vw,3rem)] font-semibold">
          {data.title[locale]}
        </h2>
        {data.sub && <p className="text-muted mt-4 max-w-2xl text-lg">{data.sub[locale]}</p>}
      </Reveal>

      <Reveal delay={0.08}>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {data.items.map((it) => {
            const Icon = icons[it.icon];
            return (
              <li key={it.name.en} className="border-line bg-surface rounded-3xl border p-7">
                <span className="border-line-strong text-accent-text grid size-12 place-items-center rounded-2xl border">
                  <Icon size={22} aria-hidden />
                </span>
                <h3 className="mt-6 text-2xl font-semibold">{it.name[locale]}</h3>
                <p className="text-accent-text mt-1 font-mono text-sm" dir="ltr">
                  {it.tech}
                </p>
                <p className="text-muted mt-4">{it.note[locale]}</p>
              </li>
            );
          })}
        </ul>

        {/* connector + shared base */}
        <div className="mx-auto flex h-8 w-px items-stretch justify-center" aria-hidden>
          <span className="bg-line-strong w-px" />
        </div>
        <div className="border-line-strong bg-surface-2 flex flex-col items-center justify-center gap-2 rounded-3xl border border-dashed px-6 py-6 text-center sm:flex-row sm:gap-5">
          <Server size={22} className="text-accent-text" aria-hidden />
          <p className="text-lg font-medium">{data.base.label[locale]}</p>
          <p className="text-muted font-mono text-sm" dir="ltr">
            {data.base.tech}
          </p>
        </div>
      </Reveal>
    </div>
  );
}
