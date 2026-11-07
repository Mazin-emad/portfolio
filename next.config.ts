import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
const withMDX = createMDX();

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const config: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // optimized variants are re-used for a week instead of the 4h default
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // fingerprint-free static media: cache for a week, revalidate in the background
        source: "/:dir(again|anime-frog|el-dokan|projects|qudra|wsyelh|portrait|icons)/:file*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=2592000",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(withMDX(config));
