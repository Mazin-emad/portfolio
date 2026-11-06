import type { Project } from "../types";

const p = "/projects/alruaa";

export const darAlRuya: Project = {
  slug: "dar-al-ruya",
  year: { en: "2026 — now", ar: "2026 — الآن" },
  status: "in-progress",
  hue: "#2f6bff",
  title: { en: "Dar Al-Ruya", ar: "دار الرؤى" },
  tagline: {
    en: "A full-stack training and assessment platform used by 12K–16K active users.",
    ar: "منصة تدريب وتقييم متكاملة يستخدمها ما بين 12 و16 ألف مستخدم نشط.",
  },
  kind: { en: "Training & assessment platform", ar: "منصة تدريب وتقييم" },
  role: { en: "Full-Stack Developer", ar: "مطوّر Full-Stack" },
  summary: {
    en: "Arabic-first platform for a Riyadh training center: landing site, course management, authentication, PDF reports, and an admin panel that controls everything — including the CMS.",
    ar: "منصة عربية لمركز تدريب في الرياض: موقع تعريفي، وإدارة دورات، ونظام تسجيل دخول، وتقارير PDF، ولوحة تحكم تدير كل شيء بما فيها نظام إدارة المحتوى.",
  },
  overview: {
    en: [
      "Dar Al-Ruya is a training center in Riyadh offering courses, professional-certification preparation and psychometric assessments. This project brings the public website, the course catalog and trainee accounts onto a single platform that works in Arabic first.",
      "I'm building it end to end — the Laravel backend, the SQL data model, authentication, PDF generation and the admin panel — and it is still in active development. Today it serves roughly 12,000 to 16,000 active users.",
    ],
    ar: [
      "دار الرؤى مركز تدريب في الرياض يقدّم الدورات والتحضير للشهادات الاحترافية والمقاييس النفسية. يجمع هذا المشروع الموقع التعريفي وكتالوج الدورات وحسابات المتدربين في منصة واحدة تعمل بالعربية أولًا.",
      "أبني المنصة من الألف إلى الياء — الباك إند بـ Laravel ونموذج بيانات SQL والمصادقة وتوليد ملفات PDF ولوحة التحكم — ولا يزال المشروع قيد التطوير النشط. يخدم اليوم ما بين 12 و16 ألف مستخدم نشط.",
    ],
  },
  highlights: {
    en: [
      {
        title: "Admin panel that controls everything",
        body: "One back office for the whole platform, including a CMS so the team edits the public site's content themselves — no developer needed per change.",
      },
      {
        title: "Course management",
        body: "A catalog of 20+ courses with dates, daily timing, duration, training hours, accreditation numbers and online badges, plus search — all managed from the admin.",
      },
      {
        title: "Authentication built for the market",
        body: "Registration with Arabic full name, email, Saudi mobile number and national/iqama ID, login with remember-me, password reset, and a redirect back to the test the user was trying to open.",
      },
      {
        title: "PDF generation",
        body: "Personalised PDF reports generated on the server so trainees can keep and share their results.",
      },
      {
        title: "Arabic-first landing page",
        body: "An interactive Life Wheel hero, assessment entry points, accreditations, testimonials and partner logos — fully RTL and responsive.",
      },
    ],
    ar: [
      {
        title: "لوحة تحكم تدير كل شيء",
        body: "لوحة إدارة واحدة للمنصة كلها، تشمل نظام إدارة محتوى يحرّر به الفريق محتوى الموقع بنفسه دون الحاجة إلى مطوّر لكل تعديل.",
      },
      {
        title: "إدارة الدورات",
        body: "كتالوج يضم أكثر من 20 دورة بتواريخها ومواعيدها اليومية ومدتها وساعاتها التدريبية وأرقام الاعتماد وشارات أونلاين، مع بحث — وكل ذلك يُدار من لوحة التحكم.",
      },
      {
        title: "نظام مصادقة مناسب للسوق",
        body: "تسجيل بالاسم الكامل بالعربية والبريد والجوال السعودي ورقم الهوية/الإقامة، وتسجيل دخول مع «تذكرني» واستعادة كلمة المرور، وإعادة توجيه المستخدم إلى الاختبار الذي كان يحاول فتحه.",
      },
      {
        title: "توليد ملفات PDF",
        body: "تقارير PDF مخصصة تُنشأ على الخادم ليحتفظ المتدربون بنتائجهم ويشاركوها.",
      },
      {
        title: "صفحة هبوط عربية أولًا",
        body: "واجهة رئيسية بعجلة الحياة التفاعلية، ومداخل الاختبارات، والاعتمادات، وآراء المتدربين، وشعارات الشركاء — كلها بدعم كامل للـ RTL ومتجاوبة.",
      },
    ],
  },
  stats: [
    { value: "12K–16K", label: { en: "active users", ar: "مستخدم نشط" } },
    { value: "20+", label: { en: "courses managed", ar: "دورة تُدار" } },
    { value: "3", label: { en: "assessments hosted", ar: "اختبارات على المنصة" } },
    { value: "100%", label: { en: "Arabic / RTL", ar: "عربي / RTL" } },
  ],
  stack: ["Laravel", "PHP", "SQL", "Artisan", "PDF generation", "Admin / CMS", "RTL", "Railway"],
  links: {
    live: "https://examinations-department-h-production.up.railway.app",
  },
  cover: `${p}/life-wheel-desktop.webp`,
  shots: [
    { src: `${p}/life-wheel-desktop.webp`, kind: "desktop", caption: { en: "Landing page — the Life Wheel", ar: "الصفحة الرئيسية — عجلة الحياة" } },
    { src: `${p}/home-mobile.webp`, kind: "mobile", caption: { en: "Landing page on mobile", ar: "الصفحة الرئيسية على الجوال" } },
    { src: `${p}/courses-desktop.webp`, kind: "desktop", caption: { en: "Courses", ar: "الدورات" } },
    { src: `${p}/courses-list-desktop.webp`, kind: "desktop", caption: { en: "Course cards with dates, hours and accreditation", ar: "بطاقات الدورات بالتواريخ والساعات والاعتماد" } },
    { src: `${p}/courses-mobile.webp`, kind: "mobile", caption: { en: "Courses on mobile", ar: "الدورات على الجوال" } },
    { src: `${p}/perception-desktop.webp`, kind: "desktop", caption: { en: "Perception styles assessment", ar: "اختبار أنماط الإدراك" } },
    { src: `${p}/seven-keys-desktop.webp`, kind: "desktop", caption: { en: "Seven Personality Keys", ar: "مفاتيح الشخصية السبعة" } },
    { src: `${p}/quick-challenge-desktop.webp`, kind: "desktop", caption: { en: "Quick challenge", ar: "التحدي السريع" } },
    { src: `${p}/services-desktop.webp`, kind: "desktop", caption: { en: "Services and accreditations", ar: "الخدمات والاعتمادات" } },
    { src: `${p}/testimonials-desktop.webp`, kind: "desktop", caption: { en: "Trainee testimonials", ar: "آراء المتدربين" } },
    { src: `${p}/partners-desktop.webp`, kind: "desktop", caption: { en: "Partners and footer", ar: "الشركاء والتذييل" } },
    { src: `${p}/life-wheel-page-desktop.webp`, kind: "desktop", caption: { en: "Life Wheel explainer", ar: "شرح عجلة الحياة" } },
    { src: `${p}/login-mobile.webp`, kind: "mobile", caption: { en: "Login", ar: "تسجيل الدخول" } },
  ],
};
