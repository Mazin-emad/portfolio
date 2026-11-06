import type { Locale, Project } from "@/content/types";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** A numbered pipeline: horizontal on desktop, a vertical timeline on small screens. */
export function FlowDiagram({
  flow,
  locale,
}: {
  flow: NonNullable<Project["flow"]>;
  locale: Locale;
}) {
  const last = flow.steps.length - 1;

  return (
    <div>
      <Reveal>
        <h2 className="max-w-2xl text-[clamp(1.75rem,4vw,3rem)] font-semibold">
          {flow.title[locale]}
        </h2>
        <p className="text-muted mt-4 max-w-2xl text-lg">{flow.sub[locale]}</p>
      </Reveal>

      <Reveal delay={0.08}>
        <ol
          className="mt-12 grid lg:grid-cols-[repeat(var(--n),minmax(0,1fr))]"
          style={{ "--n": flow.steps.length } as React.CSSProperties}
        >
          {flow.steps.map((s, i) => (
            <li
              key={s.label.en}
              className="flow-step relative ps-16 pb-10 last:pb-0 lg:px-2 lg:ps-2 lg:pb-0 lg:text-center"
            >
              <span
                className={cn(
                  "absolute start-0 top-0 grid size-12 place-items-center rounded-full border font-mono text-sm lg:static lg:mx-auto",
                  i === last
                    ? "border-accent bg-accent text-accent-ink"
                    : "border-line-strong bg-bg text-fg",
                )}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-0 pt-2 text-lg font-semibold lg:mt-5 lg:pt-0">{s.label[locale]}</h3>
              <p className="text-muted mt-1 text-sm">{s.note[locale]}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </div>
  );
}
