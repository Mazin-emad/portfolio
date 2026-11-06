import type { Project } from "../types";

export const wsyelh: Project = {
  slug: "wsyelh",
  year: { en: "2025 — 2026", ar: "2025 — 2026" },
  status: "live",
  hue: "#34d399",
  title: { en: "Wsyelh", ar: "وسيلة" },
  tagline: {
    en: "An exam preparation and correction platform with AI-driven features.",
    ar: "منصة لتحضير الاختبارات وتصحيحها، مدعومة بالذكاء الاصطناعي.",
  },
  kind: { en: "EdTech platform", ar: "منصة تعليمية" },
  role: { en: "Frontend Lead", ar: "قائد تطوير الواجهات" },
  summary: {
    en: "Dynamic exam generation, exam upload and correction, classes and automated PDF reports for educators in Saudi Arabia.",
    ar: "إنشاء الاختبارات، ورفع الأوراق وتصحيحها، وإدارة الفصول، وتقارير PDF تلقائية — لمعلمين في السعودية.",
  },
  overview: {
    en: [
      "Wsyelh is an exam preparation platform enhanced with AI-driven features that streamline how students and educators work. It was built for a private educational client in Saudi Arabia.",
      "I led the frontend: a modern, intuitive interface in React with shadcn/ui and Tailwind CSS, integrated with a .NET backend.",
    ],
    ar: [
      "وسيلة منصة لتحضير الاختبارات، تستعين بالذكاء الاصطناعي لتخفّف العبء عن الطلاب والمعلمين. بُنيت لعميل تعليمي خاص في السعودية.",
      "قدتُ العمل على الواجهات: واجهة حديثة وسهلة الاستخدام بـ React و shadcn/ui و Tailwind CSS، مرتبطة بخادم .NET.",
    ],
  },
  highlights: {
    en: [
      {
        title: "Dynamic exam generation",
        body: "Educators prepare exams from within the platform.",
      },
      {
        title: "Upload and correction",
        body: "A dedicated flow to upload exam papers and review their correction.",
      },
      {
        title: "Classes and reports",
        body: "Class management plus automated PDF reports generated with React PDF.",
      },
      {
        title: "Dashboard",
        body: "A clear overview of exams, classes and results for each educator.",
      },
    ],
    ar: [
      { title: "إنشاء الاختبارات", body: "يجهّز المعلم اختباراته من داخل المنصة نفسها." },
      {
        title: "رفع الأوراق وتصحيحها",
        body: "مسار مخصص لرفع أوراق الإجابة ثم مراجعة نتيجة تصحيحها.",
      },
      { title: "الفصول والتقارير", body: "إدارة للفصول، وتقارير PDF تُنشأ تلقائيًا بـ React PDF." },
      { title: "لوحة المعلومات", body: "صورة واضحة لاختبارات المعلم وفصوله ونتائجه في مكان واحد." },
    ],
  },
  stack: ["React", "shadcn/ui", "Tailwind CSS", "React PDF", ".NET API"],
  links: {
    live: "https://examcorrection.wsyelhi.com/",
    sourceNote: { en: "Private repository", ar: "مستودع خاص" },
  },
  cover: "/wsyelh/dashboard.jpeg",
  shots: [
    {
      src: "/wsyelh/dashboard.jpeg",
      kind: "desktop",
      caption: { en: "Dashboard", ar: "لوحة المعلومات" },
    },
    { src: "/wsyelh/exams.jpeg", kind: "desktop", caption: { en: "Exams", ar: "الاختبارات" } },
    {
      src: "/wsyelh/preparing-exam.jpeg",
      kind: "desktop",
      caption: { en: "Preparing an exam", ar: "تحضير اختبار" },
    },
    {
      src: "/wsyelh/upload-exam.jpeg",
      kind: "desktop",
      caption: { en: "Uploading papers", ar: "رفع الأوراق" },
    },
    {
      src: "/wsyelh/corection.jpeg",
      kind: "desktop",
      caption: { en: "Correction", ar: "التصحيح" },
    },
    { src: "/wsyelh/classes.jpeg", kind: "desktop", caption: { en: "Classes", ar: "الفصول" } },
    { src: "/wsyelh/reports.jpeg", kind: "desktop", caption: { en: "Reports", ar: "التقارير" } },
    { src: "/wsyelh/login.jpeg", kind: "desktop", caption: { en: "Login", ar: "تسجيل الدخول" } },
  ],
};
