import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
const withMDX = createMDX();

const config: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: { formats: ["image/avif", "image/webp"] },
};

export default withNextIntl(withMDX(config));
