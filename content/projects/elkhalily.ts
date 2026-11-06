import type { Project } from "../types";

const p = "/projects/elkhalily";

export const elkhalily: Project = {
  slug: "elkhalily",
  year: { en: "2026", ar: "2026" },
  status: "live",
  hue: "#e0614f",
  title: { en: "Elkhalily Tools", ar: "الخليلي للمعدات" },
  tagline: {
    en: "A fully RTL e-commerce storefront for professional tools — rebuilt frontend-first.",
    ar: "متجر إلكتروني للمعدات الاحترافية بدعم كامل للـ RTL — أُعيد بناء واجهته بالكامل.",
  },
  kind: { en: "E-commerce", ar: "متجر إلكتروني" },
  role: { en: "Frontend Developer", ar: "مطوّر واجهات" },
  summary: {
    en: "Arabic-first storefront for an Egyptian tool retailer and authorized distributor of 28 brands: fast shop, rich product pages, cart, wishlist, compare, and an app-like mobile experience.",
    ar: "واجهة متجر عربية أولًا لتاجر معدات في مصر وموزّع معتمد لـ 28 علامة تجارية: متجر سريع، وصفحات منتجات غنية، وسلة، ومفضلة، ومقارنة، وتجربة جوال أشبه بالتطبيق.",
  },
  overview: {
    en: [
      "Elkhalily is an Egyptian retailer of electric and hand tools and an authorized distributor for 28 brands, including Bosch, Total, Ingco and HiKOKI. The store needed a modern storefront that feels fast on a phone and reads naturally in Arabic.",
      "I owned the frontend: the shop, product pages, cart and checkout flow, accounts, wishlist, compare, and the contact page — all built RTL-first on Next.js and wired to the store's REST API. I finished it in November 2026.",
    ],
    ar: [
      "الخليلي تاجر معدات كهربائية ويدوية في مصر وموزّع معتمد لـ 28 علامة تجارية منها Bosch و Total و Ingco و HiKOKI. احتاج المتجر إلى واجهة حديثة سريعة على الجوال وتُقرأ بالعربية بشكل طبيعي.",
      "تولّيت الواجهة بالكامل: المتجر وصفحات المنتجات والسلة والدفع والحسابات والمفضلة والمقارنة وصفحة التواصل — كلها مبنية بمنهج RTL أولًا على Next.js ومرتبطة بواجهة REST الخاصة بالمتجر. أنهيتها في نوفمبر 2026.",
    ],
  },
  highlights: {
    en: [
      { title: "Shop with real filtering", body: "Price range, in-stock only, brand filter with live counts, sorting and paging — all driven by the API so large catalogs stay quick." },
      { title: "Product pages that sell", body: "Image gallery, SKU/brand/category chips, discount badges, live quantity total, buy-now, wishlist, compare, tabs for description, details and reviews, and a “bought together” bundle." },
      { title: "Compare up to 4 products", body: "Side-by-side comparison, plus wishlist and order-tracking pages for returning customers." },
      { title: "Contact built for a real business", body: "Three branches with live open/closed status, map and directions, six phone lines, WhatsApp, Messenger and Telegram, and a message form." },
      { title: "App-like on mobile", body: "A bottom tab bar (home, categories, offers, wishlist, account), a floating WhatsApp button and a profession picker for electricians, plumbers, carpenters, mechanics and more." },
      { title: "Light and dark themes", body: "A theme toggle that keeps contrast and RTL layouts intact in both modes." },
    ],
    ar: [
      { title: "متجر بفلاتر حقيقية", body: "نطاق السعر، والمتوفر فقط، وفلتر العلامات التجارية بعدّاد حي، والترتيب والترقيم — كلها عبر الـ API لتبقى الكتالوجات الكبيرة سريعة." },
      { title: "صفحات منتجات تبيع", body: "معرض صور، ورمز المنتج والعلامة والتصنيف، وشارات الخصم، والإجمالي الحي حسب الكمية، واشترِ الآن، والمفضلة، والمقارنة، وتبويبات للوصف والتفاصيل والتقييمات، وحزمة «اشترِ معه»." },
      { title: "مقارنة حتى 4 منتجات", body: "مقارنة جنبًا إلى جنب، مع صفحات المفضلة وتتبع الطلبات للعملاء العائدين." },
      { title: "تواصل مصمم لنشاط حقيقي", body: "ثلاثة فروع بحالة فتح/إغلاق مباشرة وخريطة واتجاهات، وستة أرقام هاتف، وواتساب وماسنجر وتيليجرام، ونموذج رسالة." },
      { title: "تجربة أشبه بالتطبيق على الجوال", body: "شريط تبويب سفلي (الرئيسية، الأقسام، العروض، المفضلة، حسابي)، وزر واتساب عائم، واختيار حسب المهنة للكهربائي والسباك والنجار والميكانيكي وغيرهم." },
      { title: "وضع فاتح وداكن", body: "مبدّل مظهر يحافظ على التباين وعلى تخطيط RTL في الوضعين." },
    ],
  },
  decisions: {
    en: [
      { title: "RTL from the first line", body: "Layouts, spacing, icons and carousels were designed for right-to-left reading first, not mirrored afterwards." },
      { title: "Server-rendered by default", body: "Built on the Next.js App Router so pages arrive with content already rendered — better first paint and better for search." },
      { title: "Fewer, lighter requests", body: "The home page makes about 53 network requests on mobile versus about 271 on the previous site." },
    ],
    ar: [
      { title: "RTL من السطر الأول", body: "صُممت التخطيطات والمسافات والأيقونات والسلايدر للقراءة من اليمين إلى اليسار أولًا، لا كمرآة لاحقة." },
      { title: "عرض من الخادم افتراضيًا", body: "مبني على Next.js App Router لتصل الصفحات بمحتواها جاهزًا — أسرع أول ظهور وأفضل لمحركات البحث." },
      { title: "طلبات أقل وأخف", body: "تُجري الصفحة الرئيسية نحو 53 طلب شبكة على الجوال مقابل نحو 271 في الموقع السابق." },
    ],
  },
  // TODO(owner): validate every figure below before launch.
  // Source: Lighthouse lab runs, 2026-11-06 (see docs/case-study-research.md); the SEO figure was supplied by the owner.
  stats: [
    { value: "≈60%", label: { en: "SEO improvement vs. previous site", ar: "تحسّن السيو مقارنة بالموقع السابق" } },
    { value: "271 → 53", label: { en: "network requests (home, mobile)", ar: "طلبات الشبكة (الرئيسية، جوال)" } },
    { value: "3.0s → 1.5s", label: { en: "first contentful paint (mobile)", ar: "أول ظهور للمحتوى (جوال)" } },
    { value: "28", label: { en: "authorized brands", ar: "علامة تجارية معتمدة" } },
  ],
  stack: ["Next.js", "React", "REST API", "RTL", "Vercel", "SEO"],
  links: {
    live: "https://elkhalily.vercel.app",
    sourceNote: { en: "Private repository", ar: "مستودع خاص" },
  },
  cover: `${p}/hero-desktop.webp`,
  shots: [
    { src: `${p}/hero-desktop.webp`, kind: "desktop", caption: { en: "Home — hero and categories", ar: "الرئيسية — الواجهة والأقسام" } },
    { src: `${p}/home-mobile.webp`, kind: "mobile", caption: { en: "Home on mobile with bottom navigation", ar: "الرئيسية على الجوال مع الشريط السفلي" } },
    { src: `${p}/offer-desktop.webp`, kind: "desktop", caption: { en: "Bundle offer banner", ar: "بانر عرض الحزمة" } },
    { src: `${p}/shop-real-desktop.webp`, kind: "desktop", caption: { en: "Shop with filters", ar: "المتجر مع الفلاتر" } },
    { src: `${p}/shop-real-mobile.webp`, kind: "mobile", caption: { en: "Shop on mobile", ar: "المتجر على الجوال" } },
    { src: `${p}/product-real-desktop.webp`, kind: "desktop", caption: { en: "Product page", ar: "صفحة المنتج" } },
    { src: `${p}/product-real-mobile.webp`, kind: "mobile", caption: { en: "Product page on mobile", ar: "صفحة المنتج على الجوال" } },
    { src: `${p}/brand-desktop.webp`, kind: "desktop", caption: { en: "Brand page", ar: "صفحة العلامة التجارية" } },
    { src: `${p}/professions-desktop.webp`, kind: "desktop", caption: { en: "Shop by profession", ar: "تسوّق حسب المهنة" } },
    { src: `${p}/contact-desktop.webp`, kind: "desktop", caption: { en: "Contact — branches and live status", ar: "التواصل — الفروع والحالة المباشرة" } },
    { src: `${p}/login-desktop.webp`, kind: "desktop", caption: { en: "Sign in", ar: "تسجيل الدخول" } },
    { src: `${p}/login-mobile.webp`, kind: "mobile", caption: { en: "Sign in on mobile", ar: "تسجيل الدخول على الجوال" } },
  ],
};
