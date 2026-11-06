import type { Project } from "../types";

export const elDokan: Project = {
  slug: "el-dokan",
  year: { en: "2026", ar: "2026" },
  status: "live",
  hue: "#f472b6",
  title: { en: "El-Dokan", ar: "الدكان" },
  tagline: {
    en: "A team-built Angular e-commerce platform with a .NET backend.",
    ar: "منصة تجارة إلكترونية بـ Angular بُنيت بفريق مع باك إند بـ .NET.",
  },
  kind: { en: "E-commerce", ar: "متجر إلكتروني" },
  role: { en: "Frontend Developer", ar: "مطوّر واجهات" },
  summary: {
    en: "A fully responsive shopping experience — catalog, cart, checkout, authentication and orders — built in Angular.",
    ar: "تجربة تسوّق متجاوبة بالكامل — كتالوج وسلة ودفع ومصادقة وطلبات — مبنية بـ Angular.",
  },
  overview: {
    en: [
      "El-Dokan is a collaborative e-commerce platform built by a cross-functional team. I worked as the Frontend Developer alongside two teammates who built the .NET backend.",
      "I crafted the whole Angular frontend in TypeScript with RxJS and Angular Material, integrating the catalog, cart, checkout, authentication and order management through the REST APIs the backend team provided.",
    ],
    ar: [
      "الدكان منصة تجارة إلكترونية بُنيت بفريق متعدد التخصصات. عملتُ كمطوّر واجهات إلى جانب زميلين بنيا الباك إند بـ .NET.",
      "طوّرتُ واجهة Angular كاملة بـ TypeScript و RxJS و Angular Material، وربطتُ الكتالوج والسلة والدفع والمصادقة وإدارة الطلبات عبر واجهات REST التي وفّرها فريق الباك إند.",
    ],
  },
  highlights: {
    en: [
      { title: "Complete shopping flow", body: "Product catalog, cart, checkout, authentication, wishlist and account pages." },
      { title: "Reactive architecture", body: "Routing, reactive forms and RxJS-based state patterns for a maintainable codebase." },
      { title: "Reusable UI components", body: "Scalable components on Angular Material." },
    ],
    ar: [
      { title: "رحلة تسوّق كاملة", body: "كتالوج المنتجات والسلة والدفع والمصادقة والمفضلة وصفحات الحساب." },
      { title: "معمارية تفاعلية", body: "توجيه ونماذج تفاعلية وأنماط إدارة حالة بـ RxJS لكود قابل للصيانة." },
      { title: "مكوّنات واجهة قابلة لإعادة الاستخدام", body: "مكوّنات قابلة للتوسّع على Angular Material." },
    ],
  },
  stack: ["Angular", "TypeScript", "RxJS", "Angular Material", ".NET Web API", "REST APIs"],
  links: {
    live: "https://el-dokan.vercel.app/",
    liveNote: { en: "Backend under development", ar: "الباك إند قيد التطوير" },
    github: "https://github.com/Mazin-emad/angular-ecommerce-catalog",
  },
  cover: "/el-dokan/home.png",
  shots: [
    { src: "/el-dokan/home.png", kind: "desktop", caption: { en: "Home", ar: "الرئيسية" } },
    { src: "/el-dokan/home2.png", kind: "desktop", caption: { en: "Home — featured", ar: "الرئيسية — المميز" } },
    { src: "/el-dokan/home3.png", kind: "desktop", caption: { en: "Home — categories", ar: "الرئيسية — الأقسام" } },
    { src: "/el-dokan/cart.png", kind: "desktop", caption: { en: "Cart", ar: "السلة" } },
    { src: "/el-dokan/checkout.png", kind: "desktop", caption: { en: "Checkout", ar: "الدفع" } },
    { src: "/el-dokan/login.png", kind: "desktop", caption: { en: "Login", ar: "تسجيل الدخول" } },
    { src: "/el-dokan/account.png", kind: "desktop", caption: { en: "Account", ar: "الحساب" } },
    { src: "/el-dokan/wishlist.png", kind: "desktop", caption: { en: "Wishlist", ar: "المفضلة" } },
  ],
};
