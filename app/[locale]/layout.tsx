import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/site";
import { alternatesFor } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteGraph } from "@/lib/schema";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CommandPaletteLazy } from "@/components/layout/CommandPaletteLazy";
import "../globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--fd-latin",
  display: "swap",
});
const sans = Geist({ subsets: ["latin"], variable: "--fs-latin", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--fm-latin", display: "swap" });
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  // 400 / 500 / 600 / 700 are the only weights the design uses
  weight: ["400", "500", "600", "700"],
  variable: "--f-ar",
  display: "swap",
  // Not preloaded: English pages never use it, and preloading ten files there delayed first paint.
  // Arabic pages discover it from the CSS (the @font-face rules ship either way).
  preload: false,
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07080a" },
    { media: "(prefers-color-scheme: light)", color: "#f3f2ec" },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(site.url),
    title: { default: t("title"), template: `%s — ${site.name}` },
    description: t("description"),
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    category: "technology",
    formatDetection: { telephone: false, email: false, address: false },
    alternates: {
      ...alternatesFor(locale),
      types: { "application/rss+xml": [{ url: `/${locale}/blog/feed.xml`, title: t("rss") }] },
    },
    verification: { google: site.googleVerification },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

// Sets the theme before first paint to avoid a flash. Default is dark.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t="dark"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})()`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      data-theme="dark"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} ${arabic.variable}`}
    >
      <head>
        <noscript>
          <style>{`.reveal,.rise{opacity:1!important;transform:none!important;animation:none!important}`}</style>
        </noscript>
      </head>
      <body className="grain min-h-dvh">
        {/* Theme init: raw HTML (not a React <script>) so locale switches don't trigger React's
            "script tag while rendering" warning. Parsed from the server HTML at the very top of
            <body>, it runs before anything paints, so there is no theme flash. */}
        <div hidden dangerouslySetInnerHTML={{ __html: `<script>${themeScript}</script>` }} />
        <JsonLd data={siteGraph(locale)} />
        <NextIntlClientProvider>
          <a
            href="#main"
            className="bg-accent text-accent-ink sr-only z-[100] rounded-md px-4 py-2 focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
          >
            {locale === "ar" ? "تخطَّ إلى المحتوى" : "Skip to content"}
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CommandPaletteLazy />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
