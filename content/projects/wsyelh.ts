import type { Project } from "../types";

export const wsyelh: Project = {
  slug: "wsyelh",
  year: { en: "2025 — 2026", ar: "2025 — 2026" },
  status: "live",
  hue: "#34d399",
  title: { en: "Wsyelh", ar: "وسيلة" },
  tagline: {
    en: "An exam preparation and correction platform with AI-driven features.",
    ar: "منصة لتحضير الاختبارات وتصحيحها بميزات مدعومة بالذكاء الاصطناعي.",
  },
  kind: { en: "EdTech platform", ar: "منصة تعليمية" },
  role: { en: "Frontend Lead", ar: "قائد الواجهات" },
  summary: {
    en: "Dynamic exam generation, exam upload and correction, classes and automated PDF reports for educators in Saudi Arabia.",
    ar: "توليد اختبارات ديناميكي، ورفع الاختبارات وتصحيحها، وإدارة الفصول، وتقارير PDF تلقائية للمعلمين في السعودية.",
  },
  overview: {
    en: [
      "Wsyelh is an exam preparation platform enhanced with AI-driven features that streamline how students and educators work. It was built for a private educational client in Saudi Arabia.",
      "I led the frontend: a modern, intuitive interface in React with shadcn/ui and Tailwind CSS, integrated with a .NET backend.",
    ],
    ar: [
      "وسيلة منصة لتحضير الاختبارات مدعومة بميزات الذكاء الاصطناعي تُبسّط عمل الطلاب والمعلمين. بُنيت لصالح عميل تعليمي خاص في السعودية.",
      "قدتُ تطوير الواجهات: واجهة حديثة وبديهية بـ React و shadcn/ui و Tailwind CSS، ومتكاملة مع باك إند بـ .NET.",
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
      { title: "توليد اختبارات ديناميكي", body: "يُعدّ المعلمون الاختبارات من داخل المنصة." },
      { title: "الرفع والتصحيح", body: "مسار مخصص لرفع أوراق الاختبارات ومراجعة تصحيحها." },
      { title: "الفصول والتقارير", body: "إدارة الفصول مع تقارير PDF تلقائية تُنشأ بـ React PDF." },
      { title: "لوحة المعلومات", body: "نظرة واضحة على الاختبارات والفصول والنتائج لكل معلم." },
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
