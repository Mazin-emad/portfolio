import type { Project } from "../types";

export const again: Project = {
  slug: "again",
  year: { en: "2026", ar: "2026" },
  status: "private",
  hue: "#a78bfa",
  title: { en: "Again", ar: "Again" },
  tagline: {
    en: "An offline-first, Arabic invoicing and inventory platform — built in two weeks.",
    ar: "منصة فواتير ومخزون عربية تعمل بدون إنترنت — بُنيت في أسبوعين.",
  },
  kind: { en: "Invoicing & inventory (PWA)", ar: "فواتير ومخزون (PWA)" },
  role: { en: "Frontend Developer", ar: "مطوّر واجهات" },
  summary: {
    en: "A complete RTL invoicing and inventory platform that works 100% offline and syncs automatically when the connection returns.",
    ar: "منصة فواتير ومخزون كاملة بدعم RTL تعمل بدون إنترنت بنسبة 100% وتتزامن تلقائيًا عند عودة الاتصال.",
  },
  overview: {
    en: [
      "Again needed an invoicing and inventory system its staff could rely on even with no connection. I built the frontend in two weeks as an Arabic-first, right-to-left product that runs on mobile, in the browser and on desktop.",
      "Staff can create invoices, run every calculation and print PDFs offline; everything syncs on its own once they're back online. The backend was built by Esmail Mohamed.",
    ],
    ar: [
      "احتاجت Again إلى نظام فواتير ومخزون يعتمد عليه فريقها حتى بلا اتصال. بنيتُ الواجهة في أسبوعين كمنتج عربي أولًا من اليمين إلى اليسار يعمل على الجوال والمتصفح وسطح المكتب.",
      "يستطيع الموظفون إنشاء الفواتير وإجراء كل الحسابات وطباعة ملفات PDF دون اتصال، ثم يتزامن كل شيء تلقائيًا عند عودتهم للإنترنت. الباك إند من تطوير إسماعيل محمد.",
    ],
  },
  highlights: {
    en: [
      { title: "100% offline", body: "Invoices, calculations and PDF printing all work with no connection; data syncs automatically when it returns." },
      { title: "Client-managed products and pricing rules", body: "The client adds and changes products and pricing rules themselves — no developer needed per change." },
      { title: "Roles and permissions", body: "Role-based permissions, plus shared team invoices that stay in sync across users." },
      { title: "Ready-to-print PDFs", body: "Multi-format invoice PDFs generated on the device." },
      { title: "One app, three surfaces", body: "Runs on mobile, in the browser and on desktop." },
    ],
    ar: [
      { title: "يعمل بدون إنترنت بنسبة 100%", body: "الفواتير والحسابات وطباعة PDF كلها تعمل بلا اتصال، وتتزامن البيانات تلقائيًا عند عودته." },
      { title: "منتجات وقواعد تسعير يديرها العميل", body: "يضيف العميل المنتجات وقواعد التسعير ويعدّلها بنفسه دون الحاجة إلى مطوّر لكل تغيير." },
      { title: "أدوار وصلاحيات", body: "صلاحيات قائمة على الأدوار، وفواتير مشتركة للفريق تبقى متزامنة بين المستخدمين." },
      { title: "ملفات PDF جاهزة للطباعة", body: "فواتير PDF بصيغ متعددة تُنشأ على الجهاز نفسه." },
      { title: "تطبيق واحد وثلاث منصات", body: "يعمل على الجوال والمتصفح وسطح المكتب." },
    ],
  },
  stats: [
    { value: "2 weeks", label: { en: "from start to delivery", ar: "من البداية إلى التسليم" } },
    { value: "100%", label: { en: "works offline", ar: "يعمل بدون إنترنت" } },
    { value: "3", label: { en: "platforms: mobile, web, desktop", ar: "منصات: جوال وويب وسطح مكتب" } },
  ],
  stack: ["Next.js", "Tailwind CSS", "PWA", "IndexedDB", "React PDF"],
  links: {
    liveNote: { en: "Internal — not hosted publicly", ar: "داخلي — غير متاح للعامة" },
    sourceNote: { en: "Private repository", ar: "مستودع خاص" },
  },
  cover: "/again/invoices.png",
  shots: [
    { src: "/again/invoices.png", kind: "desktop", caption: { en: "Invoices", ar: "الفواتير" } },
    { src: "/again/invoice-details.png", kind: "desktop", caption: { en: "Invoice details", ar: "تفاصيل الفاتورة" } },
    { src: "/again/new-invoice.png", kind: "desktop", caption: { en: "Create an invoice", ar: "إنشاء فاتورة" } },
    { src: "/again/new-variable.png", kind: "desktop", caption: { en: "Pricing variables", ar: "متغيرات التسعير" } },
    { src: "/again/account.png", kind: "desktop", caption: { en: "Account", ar: "الحساب" } },
  ],
};
