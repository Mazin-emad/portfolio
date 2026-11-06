import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { navItems, site } from "@/lib/site";
import { Logo } from "./Header";

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const year = new Date().getFullYear();

  const socials = [
    { label: "GitHub", href: site.github },
    { label: "LinkedIn", href: site.linkedin },
    { label: "X", href: site.twitter },
  ];

  return (
    <footer className="border-line mt-32 border-t">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="text-muted mt-4 max-w-sm">{t("tagline")}</p>
          <a
            href={`mailto:${site.email}`}
            className="link-u font-display mt-6 inline-block text-xl font-medium"
            dir="ltr"
          >
            {site.email}
          </a>
        </div>
        <nav aria-label="Footer">
          <ul className="grid gap-2.5">
            {navItems.map((n) => (
              <li key={n.key}>
                <Link href={n.href} className="text-muted hover:text-fg text-sm transition-colors">
                  {tn(n.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="grid content-start gap-2.5">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-fg inline-flex items-center gap-1.5 text-sm transition-colors"
              >
                {s.label}
                <ArrowUpRight size={14} className="flip-rtl" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-line border-t">
        <div className="container-x text-muted flex flex-col justify-between gap-2 py-6 text-xs sm:flex-row">
          <p>
            <bdi dir="ltr">
              © {year} {site.name}.
            </bdi>{" "}
            {t("rights")}
          </p>
          <p>{t("built")}</p>
        </div>
      </div>
    </footer>
  );
}
