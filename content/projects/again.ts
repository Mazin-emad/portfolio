import type { Project } from "../types";

export const again: Project = {
  slug: "again",
  year: { en: "Aug 2026", ar: "أغسطس 2026" },
  status: "private",
  hue: "#a78bfa",
  title: { en: "Again", ar: "Again" },
  tagline: {
    en: "A full multi-platform system for invoicing and inventory — designed so factory and company staff pick it up fast.",
    ar: "نظام فواتير ومخزون متكامل على الويب والجوال وسطح المكتب — بُني ليتعلّمه عمّال الشركة والمصنع بسرعة، لا المبرمجون وحدهم.",
  },
  kind: {
    en: "Multi-platform invoicing & inventory system",
    ar: "نظام فواتير ومخزون متعدد المنصات",
  },
  role: { en: "Frontend & Cross-platform Developer", ar: "مطوّر واجهات وتطبيقات متعددة المنصات" },
  summary: {
    en: "A full-stack system: a fast, scalable ASP.NET Core backend with a complex equation engine, and one familiar interface across web, React Native mobile and an Electron desktop app — working 100% offline.",
    ar: "نظام Full-Stack كامل: خادم ASP.NET Core سريع وقابل للتوسع بمحرّك معادلات معقّد، وواجهة واحدة مألوفة على الويب والجوال (React Native) وسطح المكتب (Electron) — تعمل بلا إنترنت بنسبة 100%.",
  },
  overview: {
    en: [
      "Again handles invoicing and inventory for a company and its factory. The people using it are workers, not engineers — they need something simple, fast and dependable. So the brief was clear: one system that looks and behaves the same everywhere, and keeps working when the internet doesn't.",
      "It is a full-stack, multi-platform system. The backend is a fast, scalable ASP.NET Core API, built by Esmail Mohamed, with a complex equation engine that generates invoices and product information for every unique product. I built what the users touch: the web app, the React Native mobile app, and the desktop app — the same React web code wrapped in Electron.",
      "My backend teammate and I built the whole system — backend, web, mobile and desktop — in two weeks in August 2026, using AI as a multiplier on top of our own experience. It was a very successful delivery.",
    ],
    ar: [
      "تدير Again فواتير شركة ومصنعها ومخزونهما. والذين يستخدمون النظام عمّال لا مهندسون، يحتاجون شيئًا بسيطًا وسريعًا يُعتمد عليه. فكان المطلوب واضحًا: نظام واحد يبدو ويعمل بالطريقة نفسها على كل جهاز، ولا يتوقف إذا انقطع الإنترنت.",
      "هو نظام Full-Stack متعدد المنصات. الخادم واجهة ASP.NET Core سريعة وقابلة للتوسع، من تطوير إسماعيل محمد، وفيها محرّك معادلات معقّد يُنتج الفواتير وبيانات كل منتج على حدة مهما اختلفت قواعده. وأنا بنيتُ كل ما يتعامل معه المستخدم: تطبيق الويب، وتطبيق الجوال بـ React Native، وتطبيق سطح المكتب — وهو كود React الخاص بالويب نفسه داخل Electron.",
      "بنيتُ أنا وزميلي في الباك إند النظام كله — الخادم والويب والجوال وسطح المكتب — في أسبوعين خلال أغسطس 2026، مستعينَين بالذكاء الاصطناعي إلى جانب خبرتنا. وكانت تجربة ناجحة جدًا.",
    ],
  },
  platforms: {
    title: { en: "One system, three platforms", ar: "نظام واحد على ثلاث منصات" },
    sub: {
      en: "The same interface and the same behaviour on every device — so people learn it once and use it anywhere.",
      ar: "الواجهة نفسها والسلوك نفسه على كل جهاز، فيتعلّم المستخدم النظام مرة واحدة ويستخدمه في أي مكان.",
    },
    items: [
      {
        icon: "web",
        name: { en: "Web", ar: "الويب" },
        tech: "Next.js · PWA · IndexedDB",
        note: {
          en: "Installable, fully offline, and it syncs on its own when the connection returns.",
          ar: "قابل للتثبيت، يعمل بلا إنترنت بالكامل، ويتزامن تلقائيًا فور عودة الاتصال.",
        },
      },
      {
        icon: "mobile",
        name: { en: "Mobile", ar: "الجوال" },
        tech: "React Native",
        note: {
          en: "A real mobile app with the same screens and the same flow the workers already know.",
          ar: "تطبيق جوال حقيقي بالشاشات والمسار نفسيهما اللذين اعتاد عليهما العمّال.",
        },
      },
      {
        icon: "desktop",
        name: { en: "Desktop", ar: "سطح المكتب" },
        tech: "React + Electron",
        note: {
          en: "The web code itself, wrapped in Electron — identical by design, not by effort.",
          ar: "كود الويب نفسه داخل Electron — التطابق هنا بحكم التصميم، لا بالجهد.",
        },
      },
    ],
    base: {
      label: { en: "One backend serves them all", ar: "خادم واحد يخدمها جميعًا" },
      tech: "ASP.NET Core · equation engine",
    },
  },
  highlights: {
    en: [
      {
        title: "An equation engine for every product",
        body: "Every product carries its own pricing logic. A complex equation engine in the .NET backend calculates each invoice and the product details that come with it — and the client adds products and pricing rules themselves, with no developer needed per change.",
      },
      {
        title: "A fast, scalable .NET core",
        body: "An ASP.NET Core API built for speed and growth, serving web, mobile and desktop from a single backend.",
      },
      {
        title: "100% offline",
        body: "Invoices, every calculation and PDF printing work with no connection, then everything syncs automatically once it's back.",
      },
      {
        title: "Roles and shared invoices",
        body: "Role-based permissions, and team invoices that stay in sync across every user and device.",
      },
      {
        title: "Print-ready PDFs",
        body: "Multi-format invoice PDFs generated on the device itself.",
      },
      {
        title: "Arabic, and simple on purpose",
        body: "A clear RTL interface kept deliberately plain, so someone who isn't technical can learn it in a short time.",
      },
    ],
    ar: [
      {
        title: "محرّك معادلات لكل منتج",
        body: "لكل منتج منطق تسعير خاص به. ويتولى محرّك المعادلات المعقّد في خادم .NET حساب كل فاتورة وبيانات منتجها، ويضيف العميل المنتجات وقواعد التسعير ويعدّلها بنفسه دون حاجة إلى مطوّر في كل مرة.",
      },
      {
        title: "نواة .NET سريعة وقابلة للتوسع",
        body: "واجهة ASP.NET Core مصممة للسرعة والنمو، وتخدم الويب والجوال وسطح المكتب من خادم واحد.",
      },
      {
        title: "يعمل بلا إنترنت 100%",
        body: "إنشاء الفواتير وكل الحسابات وطباعة PDF تعمل دون اتصال، ثم تتزامن البيانات تلقائيًا بمجرد عودة الإنترنت.",
      },
      {
        title: "أدوار وفواتير مشتركة",
        body: "صلاحيات حسب الدور، وفواتير مشتركة بين الفريق تبقى متزامنة عند الجميع وعلى كل جهاز.",
      },
      {
        title: "فواتير PDF جاهزة للطباعة",
        body: "ملفات PDF بصيغ متعددة تُنشأ على الجهاز نفسه.",
      },
      {
        title: "عربي وبسيط عن قصد",
        body: "واجهة RTL واضحة وهادئة عمدًا، ليتعلمها من ليس تقنيًا في وقت قصير.",
      },
    ],
  },
  decisions: {
    en: [
      {
        title: "One interface, everywhere",
        body: "Web, mobile and desktop look and behave the same. A worker learns the app once, then works confidently on whichever device is in front of them.",
      },
      {
        title: "The web code, reused for desktop",
        body: "The desktop app is the same React web code packaged in Electron. That was a deliberate shortcut: it saved weeks, shipped faster, and guarantees the desktop behaves exactly like the web version.",
      },
      {
        title: "React Native for the phone",
        body: "A native mobile app built on the same mental model, so the phone feels like the desktop app people already know.",
      },
      {
        title: "Designed for who actually uses it",
        body: "The users are company and factory workers, not technical people — so every screen favours clarity and familiarity over cleverness.",
      },
    ],
    ar: [
      {
        title: "واجهة واحدة في كل مكان",
        body: "الويب والجوال وسطح المكتب تبدو وتعمل بالطريقة نفسها. يتعلم العامل التطبيق مرة واحدة ثم يعمل بثقة على أي جهاز أمامه.",
      },
      {
        title: "كود الويب نفسه لسطح المكتب",
        body: "تطبيق سطح المكتب هو كود React الخاص بالويب نفسه داخل Electron. كان اختصارًا مقصودًا: وفّر أسابيع من العمل، وسرّع التسليم، وضمن أن يتصرف التطبيق على الحاسوب تمامًا كما يتصرف على الويب.",
      },
      {
        title: "React Native للهاتف",
        body: "تطبيق جوال أصلي مبني على منطق الاستخدام نفسه، فيشعر المستخدم أن هاتفه هو تطبيق الحاسوب الذي اعتاده.",
      },
      {
        title: "مصمم لمن سيستخدمه فعلًا",
        body: "المستخدمون عمّال في شركة ومصنع وليسوا تقنيين، فكل شاشة تُقدّم الوضوح والألفة على الابتكار الزائد.",
      },
    ],
  },
  stats: [
    { value: "3", label: { en: "platforms, one interface", ar: "منصات بواجهة واحدة" } },
    { value: "100%", label: { en: "works offline", ar: "يعمل بلا إنترنت" } },
    { value: "2 weeks", label: { en: "from start to delivery", ar: "من البداية إلى التسليم" } },
  ],
  stack: [
    "ASP.NET Core",
    ".NET",
    "Equation engine",
    "React Native",
    "Electron",
    "Next.js",
    "React",
    "Tailwind CSS",
    "PWA",
    "IndexedDB",
    "React PDF",
  ],
  links: {
    liveNote: { en: "Internal — not hosted publicly", ar: "داخلي — غير متاح للعامة" },
    sourceNote: { en: "Private repository", ar: "مستودع خاص" },
  },
  cover: "/again/invoices.png",
  shots: [
    { src: "/again/invoices.png", kind: "desktop", caption: { en: "Invoices", ar: "الفواتير" } },
    {
      src: "/again/invoice-details.png",
      kind: "desktop",
      caption: { en: "Invoice details", ar: "تفاصيل الفاتورة" },
    },
    {
      src: "/again/new-invoice.png",
      kind: "desktop",
      caption: { en: "Create an invoice", ar: "إنشاء فاتورة" },
    },
    {
      src: "/again/new-variable.png",
      kind: "desktop",
      caption: { en: "Pricing variables", ar: "متغيرات التسعير" },
    },
    { src: "/again/account.png", kind: "desktop", caption: { en: "Account", ar: "الحساب" } },
  ],
};
