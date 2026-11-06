import type { Project } from "../types";

const p = "/projects/elkhalily";

export const elkhalily: Project = {
  slug: "elkhalily",
  year: { en: "2026", ar: "2026" },
  status: "live",
  hue: "#e0614f",
  title: { en: "Elkhalily Tools", ar: "الخليلي للمعدات" },
  tagline: {
    en: "A complete commerce system for a tools retailer: real payments, automated shipping, and an admin dashboard that runs the whole store — on a fast, fully RTL storefront.",
    ar: "منظومة بيع متكاملة لتاجر أدوات ومعدات: دفع إلكتروني حقيقي، وشحن يعمل تلقائيًا، ولوحة تحكم تدير المتجر كله — خلف واجهة عربية سريعة بُنيت من اليمين إلى اليسار.",
  },
  kind: { en: "E-commerce platform", ar: "منصة تجارة إلكترونية" },
  role: { en: "Frontend Developer", ar: "مطوّر واجهات" },
  summary: {
    en: "An Egyptian authorized distributor of 28 brands needed more than a shop window. This is a full e-commerce system — live payment gateways, automated shipping, smart order and product management, and a dashboard that controls everything — behind a storefront that is fast on a phone and native in Arabic.",
    ar: "موزّع معتمد لـ 28 علامة تجارية في مصر لم يكن يحتاج واجهة عرض فقط، بل نظام بيع كاملًا: بوابات دفع حقيقية، وشحنًا تلقائيًا، وإدارة ذكية للطلبات والمنتجات، ولوحة تحكم تدير كل شيء — خلف متجر سريع على الجوال وعربي في تفاصيله.",
  },
  overview: {
    en: [
      "Elkhalily is an Egyptian retailer of electric and hand tools and an authorized distributor for 28 brands, including Bosch, Total, Ingco and HiKOKI. What the business needed was not just a nicer website — it was a commerce system that takes an order from the first click to the customer's door with as little manual work as possible.",
      "I built the storefront and the logic-heavy flows on top of the platform's APIs: a full checkout connected to real payment gateways and payment methods, and the order and shipment states that follow it. It is RTL-first, server-rendered with Next.js, and designed to feel instant on a phone.",
      "Behind the store sits an admin dashboard that controls everything on the website. Payment and shipping are connected through APIs and run automatically, while order and product management stay smart enough that the team spends its time selling, not chasing. The project shipped in November 2026.",
    ],
    ar: [
      "الخليلي تاجر أدوات ومعدات كهربائية ويدوية في مصر، وموزّع معتمد لـ 28 علامة تجارية منها Bosch وTotal وIngco وHiKOKI. لم يكن المطلوب موقعًا أجمل فحسب، بل نظام بيع يأخذ الطلب من أول نقرة حتى باب العميل بأقل تدخّل يدوي ممكن.",
      "توليتُ المتجر والمنطق الثقيل الذي يقوم عليه فوق واجهات الـ API الخاصة بالمنصة: عملية دفع كاملة مرتبطة ببوابات دفع ووسائل دفع حقيقية، وما يتبعها من حالات الطلب والشحن. والواجهة مبنية للعربية من الأساس، تُعرض من الخادم عبر Next.js، وتعمل على الجوال بسلاسة.",
      "ومن خلف المتجر لوحة تحكم تدير كل ما في الموقع. الدفع والشحن مرتبطان بواجهات API ويعملان تلقائيًا، وإدارة الطلبات والمنتجات ذكية بما يكفي ليتفرغ الفريق للبيع بدل المتابعة اليدوية. وقد أُطلق المشروع في نوفمبر 2026.",
    ],
  },
  flow: {
    title: { en: "How an order moves through the system", ar: "رحلة الطلب داخل المنظومة" },
    sub: {
      en: "Payment and shipping are connected through APIs and run on their own. The admin dashboard oversees every step.",
      ar: "الدفع والشحن مرتبطان بواجهات API ويعملان من تلقاء نفسيهما، ولوحة التحكم تشرف على كل خطوة.",
    },
    steps: [
      {
        label: { en: "Storefront", ar: "المتجر" },
        note: { en: "Browse, filter, compare", ar: "تصفّح وفلترة ومقارنة" },
      },
      {
        label: { en: "Checkout", ar: "إتمام الطلب" },
        note: { en: "Cart to order in one flow", ar: "من السلة إلى الطلب في مسار واحد" },
      },
      {
        label: { en: "Payment", ar: "الدفع" },
        note: { en: "Real gateways and methods", ar: "بوابات ووسائل دفع حقيقية" },
      },
      {
        label: { en: "Orders", ar: "الطلبات" },
        note: { en: "Smart order management", ar: "إدارة ذكية للطلبات" },
      },
      {
        label: { en: "Shipping", ar: "الشحن" },
        note: { en: "Carrier APIs, automated", ar: "ربط تلقائي بواجهات الشحن" },
      },
      {
        label: { en: "Admin dashboard", ar: "لوحة التحكم" },
        note: { en: "Controls everything", ar: "تتحكم في كل شيء" },
      },
    ],
  },
  highlights: {
    en: [
      {
        title: "Checkout wired to real payments",
        body: "A complete checkout connected to live payment gateways and multiple payment methods. The interface walks the customer through the whole payment journey, so they always know where their order stands.",
      },
      {
        title: "Payment and shipping on autopilot",
        body: "Both are integrated through APIs and fully automated. Once an order is placed, payment and shipment move forward on their own — no one has to copy details between systems.",
      },
      {
        title: "An admin dashboard that runs the store",
        body: "One dashboard controls everything on the website — products, orders, shipping and payments — so the team operates the store day to day without a developer.",
      },
      {
        title: "Smart order and product management",
        body: "Orders travel from purchase to delivery with far less follow-up, and the catalog — brands, categories, prices, discounts, stock and bundles — is managed from one place.",
      },
      {
        title: "A storefront built to sell",
        body: "Real filters (price, availability, brand with live counts, sorting), product pages with galleries, discounts, tabs and “bought together” bundles, plus wishlist, compare-up-to-4 and order tracking.",
      },
      {
        title: "Contact built for a real business",
        body: "Three branches with live open/closed status, map and directions, six phone lines, WhatsApp, Messenger and Telegram, and a message form.",
      },
      {
        title: "App-like on mobile",
        body: "A bottom tab bar (home, categories, offers, wishlist, account), a floating WhatsApp button, light and dark themes, and a profession picker for electricians, plumbers, carpenters, mechanics and more.",
      },
    ],
    ar: [
      {
        title: "دفع حقيقي من أول خطوة لآخرها",
        body: "عملية إتمام طلب كاملة مرتبطة ببوابات دفع حقيقية وعدة وسائل دفع. والواجهة ترافق العميل في رحلة الدفع كلها، فيعرف دائمًا أين وصل طلبه.",
      },
      {
        title: "دفع وشحن بلا تدخّل يدوي",
        body: "كلاهما مرتبط عبر واجهات API ويعمل تلقائيًا بالكامل. ما إن يُسجَّل الطلب حتى يتحرك الدفع والشحن من تلقاء نفسيهما، ولا أحد يضطر إلى نقل البيانات بين الأنظمة.",
      },
      {
        title: "لوحة تحكم تدير المتجر",
        body: "لوحة واحدة يتحكم منها الفريق في كل ما يخص الموقع — المنتجات والطلبات والشحن والدفع — ويشغّل المتجر يوميًا دون الحاجة إلى مطوّر.",
      },
      {
        title: "إدارة ذكية للطلبات والمنتجات",
        body: "الطلبات تسير من الشراء حتى التسليم بمتابعة أقل بكثير، والكتالوج — بعلاماته وأقسامه وأسعاره وخصوماته ومخزونه وحِزمه — يُدار من مكان واحد.",
      },
      {
        title: "متجر مبني ليبيع",
        body: "فلاتر حقيقية (السعر والتوفر والعلامة التجارية بعدّاد حي والترتيب)، وصفحات منتجات بمعرض صور وخصومات وتبويبات وحزمة «اشترِ معه»، إضافة إلى المفضلة ومقارنة حتى 4 منتجات وتتبّع الطلبات.",
      },
      {
        title: "تواصل يليق بنشاط حقيقي",
        body: "ثلاثة فروع بحالة فتح وإغلاق مباشرة، وخريطة واتجاهات، وستة أرقام هاتف، وواتساب وماسنجر وتيليجرام، ونموذج رسالة.",
      },
      {
        title: "تجربة كأنها تطبيق على الجوال",
        body: "شريط تنقّل سفلي (الرئيسية، الأقسام، العروض، المفضلة، حسابي)، وزر واتساب عائم، ووضعان فاتح وداكن، واختيار حسب المهنة للكهربائي والسباك والنجار والميكانيكي وغيرهم.",
      },
    ],
  },
  decisions: {
    en: [
      {
        title: "RTL from the first line",
        body: "Layouts, spacing, icons and carousels were designed for right-to-left reading first, not mirrored at the end.",
      },
      {
        title: "Server-rendered by default",
        body: "Built on the Next.js App Router so pages arrive with content already rendered — a faster first paint and a store that search engines understand.",
      },
      {
        title: "Fewer, lighter requests",
        body: "The home page makes about 53 network requests on mobile, down from about 271 on the previous site.",
      },
      {
        title: "A design system, shipped fast",
        body: "Tailwind CSS with shadcn/ui keeps a store this large visually consistent, and Claude Code in the workflow helped deliver it quickly without cutting corners.",
      },
    ],
    ar: [
      {
        title: "RTL من أول سطر",
        body: "صُمّمت التخطيطات والمسافات والأيقونات والسلايدر للقراءة من اليمين إلى اليسار منذ البداية، لا كنسخة معكوسة تُضاف في النهاية.",
      },
      {
        title: "عرض من الخادم افتراضيًا",
        body: "مبني على Next.js App Router، فتصل الصفحات بمحتواها جاهزًا: أسرع في الظهور الأول، وأوضح لمحركات البحث.",
      },
      {
        title: "طلبات أقل وأخف",
        body: "تُجري الصفحة الرئيسية نحو 53 طلبًا على الجوال، بعد أن كانت نحو 271 في الموقع السابق.",
      },
      {
        title: "نظام تصميم واحد وتسليم سريع",
        body: "Tailwind CSS مع shadcn/ui يحافظان على اتساق متجر بهذا الحجم، وClaude Code ضمن أسلوب العمل ساعد على إنجازه بسرعة دون تنازل عن الجودة.",
      },
    ],
  },
  // TODO(owner): validate every figure below before launch.
  // Source: Lighthouse lab runs, 2026-11-06 (see docs/case-study-research.md); the SEO figure was supplied by the owner.
  stats: [
    {
      value: "≈60%",
      label: { en: "SEO improvement vs. previous site", ar: "تحسّن السيو مقارنةً بالموقع السابق" },
    },
    {
      value: "271 → 53",
      label: { en: "network requests (home, mobile)", ar: "طلبات الشبكة (الرئيسية، جوال)" },
    },
    {
      value: "3.0s → 1.5s",
      label: { en: "first contentful paint (mobile)", ar: "أول ظهور للمحتوى (جوال)" },
    },
    { value: "28", label: { en: "authorized brands", ar: "علامة تجارية معتمدة" } },
  ],
  stack: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "shadcn/ui",
    "REST APIs",
    "Payment gateways",
    "Shipping APIs",
    "Claude Code",
    "RTL",
    "Vercel",
    "SEO",
  ],
  links: {
    live: "https://elkhalily.vercel.app",
    sourceNote: { en: "Private repository", ar: "مستودع خاص" },
  },
  cover: `${p}/hero-desktop.webp`,
  shots: [
    {
      src: `${p}/hero-desktop.webp`,
      kind: "desktop",
      caption: { en: "Home — hero and categories", ar: "الرئيسية — الواجهة والأقسام" },
    },
    {
      src: `${p}/home-mobile.webp`,
      kind: "mobile",
      caption: {
        en: "Home on mobile with bottom navigation",
        ar: "الرئيسية على الجوال مع الشريط السفلي",
      },
    },
    {
      src: `${p}/offer-desktop.webp`,
      kind: "desktop",
      caption: { en: "Bundle offer banner", ar: "بانر عرض الحزمة" },
    },
    {
      src: `${p}/shop-real-desktop.webp`,
      kind: "desktop",
      caption: { en: "Shop with filters", ar: "المتجر مع الفلاتر" },
    },
    {
      src: `${p}/shop-real-mobile.webp`,
      kind: "mobile",
      caption: { en: "Shop on mobile", ar: "المتجر على الجوال" },
    },
    {
      src: `${p}/product-real-desktop.webp`,
      kind: "desktop",
      caption: { en: "Product page", ar: "صفحة المنتج" },
    },
    {
      src: `${p}/product-real-mobile.webp`,
      kind: "mobile",
      caption: { en: "Product page on mobile", ar: "صفحة المنتج على الجوال" },
    },
    {
      src: `${p}/brand-desktop.webp`,
      kind: "desktop",
      caption: { en: "Brand page", ar: "صفحة العلامة التجارية" },
    },
    {
      src: `${p}/professions-desktop.webp`,
      kind: "desktop",
      caption: { en: "Shop by profession", ar: "تسوّق حسب المهنة" },
    },
    {
      src: `${p}/contact-desktop.webp`,
      kind: "desktop",
      caption: {
        en: "Contact — branches and live status",
        ar: "التواصل — الفروع والحالة المباشرة",
      },
    },
    {
      src: `${p}/login-desktop.webp`,
      kind: "desktop",
      caption: { en: "Sign in", ar: "تسجيل الدخول" },
    },
    {
      src: `${p}/login-mobile.webp`,
      kind: "mobile",
      caption: { en: "Sign in on mobile", ar: "تسجيل الدخول على الجوال" },
    },
  ],
};
