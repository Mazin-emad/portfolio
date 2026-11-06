import Image from "next/image";
import { ArrowUpRight, Code, ImageOff } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/content/types";
import { archive } from "@/content/archive";
import { Reveal } from "@/components/ui/Reveal";

export async function ArchiveList() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("common");

  const n2 = (2 - (archive.length % 2)) % 2;
  const n3 = (3 - (archive.length % 3)) % 3;

  return (
    <Reveal>
      <ul className="border-line bg-line grid gap-px overflow-hidden rounded-3xl border sm:grid-cols-2 lg:grid-cols-3">
        {archive.map((item) => (
          <li key={item.title} className="bg-bg">
            <article className="group flex h-full flex-col p-5">
              <div className="bg-surface-2 relative mb-5 aspect-[16/10] overflow-hidden rounded-xl">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="text-muted grid h-full place-items-center" aria-hidden>
                    <ImageOff size={28} strokeWidth={1.4} />
                  </div>
                )}
              </div>
              <p className="label mb-2">
                {item.year} · {item.kind[locale]}
              </p>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-muted mt-2 flex-1 text-sm">{item.summary[locale]}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {item.stack.map((s) => (
                  <li
                    key={s}
                    className="border-line text-muted rounded-full border px-2.5 py-0.5 text-xs"
                    dir="ltr"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                {item.live && !item.liveNote && (
                  <a
                    href={item.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-u inline-flex items-center gap-1"
                  >
                    {t("liveSite")} <ArrowUpRight size={14} className="flip-rtl" aria-hidden />
                  </a>
                )}
                {item.liveNote && (
                  <span className="text-muted text-xs">{item.liveNote[locale]}</span>
                )}
                {item.github && (
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-u text-muted hover:text-fg inline-flex items-center gap-1.5"
                  >
                    <Code size={14} aria-hidden /> {t("sourceCode")}
                  </a>
                )}
              </div>
            </article>
          </li>
        ))}
        {Array.from({ length: n3 }, (_, i) => (
          <li
            key={`fill-${i}`}
            aria-hidden
            className={`bg-bg hidden lg:block ${i < n2 ? "sm:block" : ""}`}
          />
        ))}
      </ul>
    </Reveal>
  );
}
