import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // `\\.` (escaped in the string) keeps files with an extension (sitemap.xml, images, feed.xml) out
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
