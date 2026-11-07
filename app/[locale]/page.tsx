import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { StackMarquee } from "@/components/home/StackMarquee";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Approach } from "@/components/home/Approach";
import { CtaBand } from "@/components/home/CtaBand";
import { PageSchema } from "@/components/seo/PageSchema";
import { staticPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return staticPageMetadata(locale, "/", "home");
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageSchema locale={locale} path="/" page="home" />
      <Hero />
      <StackMarquee />
      <FeaturedWork />
      <Approach />
      <CtaBand />
    </>
  );
}
