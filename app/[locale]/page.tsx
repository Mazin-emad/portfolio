import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { StackMarquee } from "@/components/home/StackMarquee";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Approach } from "@/components/home/Approach";
import { CtaBand } from "@/components/home/CtaBand";
import { JsonLd, personJsonLd } from "@/components/seo/JsonLd";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <Hero />
      <StackMarquee />
      <FeaturedWork />
      <Approach />
      <CtaBand />
    </>
  );
}
