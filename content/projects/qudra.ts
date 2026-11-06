import type { Project } from "../types";

export const qudra: Project = {
  slug: "qudra",
  year: { en: "2025 — now", ar: "2025 — الآن" },
  status: "live",
  hue: "#f59e0b",
  title: { en: "Qudra", ar: "قدرة" },
  tagline: {
    en: "A platform that helps a speech and language therapist assess and support children.",
    ar: "منصة تعين أخصائي النطق واللغة على تقييم الأطفال ومتابعتهم.",
  },
  kind: { en: "Health & learning platform", ar: "منصة صحية وتعليمية" },
  role: { en: "Frontend Developer", ar: "مطوّر واجهات" },
  summary: {
    en: "A question-based assessment system that delivers personalised learning experiences for children with learning and communication difficulties.",
    ar: "نظام تقييم يعتمد على الأسئلة، ويقدّم لكل طفل يواجه صعوبة في التعلم أو التواصل تجربة تعلّم تناسبه.",
  },
  overview: {
    en: [
      "Qudra is a web platform for a speech and language therapist, designed to help children with learning and communication difficulties. It assesses children through a question-based system and delivers personalised learning experiences.",
      "I worked as the Frontend Developer alongside a backend developer and a UI/UX designer, turning the Figma designs into a responsive, intuitive interface and integrating the backend APIs.",
    ],
    ar: [
      "قدرة منصة ويب لأخصائي نطق ولغة، هدفها مساعدة الأطفال الذين يواجهون صعوبات في التعلم والتواصل. تقيّم الطفل من خلال أسئلة، ثم تقدّم له تجربة تعلّم تناسب احتياجه.",
      "كنتُ مطوّر الواجهات في فريق ضمّ مطوّر باك إند ومصمم UI/UX. حوّلتُ تصاميم Figma إلى واجهة متجاوبة سهلة الاستخدام، وربطتها بواجهات الباك إند.",
    ],
  },
  highlights: {
    en: [
      {
        title: "Question-based assessment",
        body: "Interactive question screens that adapt the experience to each child.",
      },
      {
        title: "Reusable, scalable components",
        body: "A component library built on shadcn/ui and Tailwind CSS.",
      },
      {
        title: "Smooth API integration",
        body: "Reliable integration with the backend for a stable user experience.",
      },
    ],
    ar: [
      { title: "تقييم بالأسئلة", body: "شاشات أسئلة تفاعلية تتكيّف مع كل طفل." },
      {
        title: "مكوّنات يُعاد استخدامها",
        body: "مكتبة مكوّنات مبنية على shadcn/ui و Tailwind CSS، تنمو مع المشروع.",
      },
      { title: "ربط سلس بالـ API", body: "تكامل موثوق مع الباك إند يضمن تجربة مستقرة." },
    ],
  },
  stack: ["React", "Tailwind CSS", "shadcn/ui", "Figma"],
  links: {
    live: "https://qudra-web.vercel.app/",
    sourceNote: { en: "Private repository", ar: "مستودع خاص" },
  },
  cover: "/qudra/landing.png",
  shots: [
    {
      src: "/qudra/landing.png",
      kind: "desktop",
      caption: { en: "Landing page", ar: "الصفحة الرئيسية" },
    },
    {
      src: "/qudra/enter-test.png",
      kind: "desktop",
      caption: { en: "Starting an assessment", ar: "بدء التقييم" },
    },
    {
      src: "/qudra/question1.png",
      kind: "desktop",
      caption: { en: "Question screen", ar: "شاشة سؤال" },
    },
    {
      src: "/qudra/question2.png",
      kind: "desktop",
      caption: { en: "Question screen", ar: "شاشة سؤال" },
    },
    {
      src: "/qudra/question3.png",
      kind: "desktop",
      caption: { en: "Question screen", ar: "شاشة سؤال" },
    },
    {
      src: "/qudra/question4.png",
      kind: "desktop",
      caption: { en: "Question screen", ar: "شاشة سؤال" },
    },
  ],
};
