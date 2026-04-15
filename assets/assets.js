import profile_img from "./mazin-test.png";
import vscode from "./vscode.png";
import firebase from "./firebase.png";
import figma from "./figma.png";
import git from "./git.png";
import mongodb from "./mongodb.png";
import user_image from "./mazin3.jpg";
import header_bg_color from "./header-bg-color.png";
import {
  FaUserGraduate,
  FaProjectDiagram,
  FaGlobe,
  FaMobileAlt,
  FaServer,
  FaDesktop,
} from "react-icons/fa";
import { IoCodeSlashOutline } from "react-icons/io5";

export const assets = {
  user_image,
  vscode,
  firebase,
  figma,
  git,
  mongodb,
  profile_img,
  header_bg_color,
};

export const workData = [
  {
    title: "Qudra",
    description: "Frontend Dev.",
    bgImage: "/qudra/landing.png",
    images: [
      "/qudra/landing.png",
      "/qudra/enter-test.png",
      "/qudra/question1.png",
      "/qudra/question2.png",
      "/qudra/question3.png",
      "/qudra/question4.png",
    ],
    link: "https://qudra-web.vercel.app/",
    longDescription:
      "I worked as the Frontend Developer on a web platform for a speech and language therapist, designed to help children with learning and communication difficulties. Built in collaboration with a backend developer and a UI/UX designer, my role focused on creating a responsive, intuitive interface. The platform uses a question-based system to assess children and deliver personalized learning experiences. I developed scalable, reusable components and ensured smooth integration with backend APIs for a reliable and efficient user experience. This project reflects my ability to build clean, user-focused interfaces for impactful, real-world solutions.",
    technologies: ["Figma", "React", "Tailwind CSS", "shadcn/ui"],
    role: "Frontend Developer",
    year: "2025 - now",
    github: "https://github.com/Mazin-emad",
  },
  {
    title: "Wsyelh",
    description: "Frontend Dev.",
    bgImage: "/wsyelh/corection.jpeg",
    images: [
      "/wsyelh/dashboard.jpeg",
      "/wsyelh/login.jpeg",
      "/wsyelh/exams.jpeg",
      "/wsyelh/preparing-exam.jpeg",
      "/wsyelh/upload-exam.jpeg",
      "/wsyelh/classes.jpeg",
      "/wsyelh/corection.jpeg",
      "/wsyelh/reports.jpeg",
      "/wsyelh/dddd.jpeg",
    ],
    link: "https://exams.wsyelhi.com/",
    longDescription:
      "A comprehensive exam preparation platform enhanced with AI-driven features to streamline the learning process. I spearheaded the frontend development, crafting a modern and intuitive user interface using React, Shadcn/UI, and Tailwind CSS. The platform integrates seamlessly with a .NET backend to provide a robust experience for students and educators alike. Developed for a private educational client in Saudi Arabia, the site includes features for dynamic exam generation and automated PDF reporting using React PDF.",
    technologies: ["React", "shadcn/ui", "Tailwind CSS", "React PDF"],
    role: "Frontend Developer",
    year: "2025 - 2026",
    github: "https://github.com/Mazin-emad",
  },
  {
    title: "RaiZero.com",
    description: "Frontend Dev.",
    bgImage: "/raizero.png",
    images: ["/raizero.png"],
    link: "https://raizero.com",
    longDescription:
      "A professional company website for RaiZero, built with modern frontend technologies. Features a sleek landing page with smooth animations, responsive layouts, and optimized performance for a seamless user experience.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    role: "Frontend Developer",
    year: "2024",
    github: "https://github.com/Mazin-emad",
  },
  {
    title: "Tajmi3ah",
    description: "Frontend Dev.",
    bgImage: "/tgmi3ah.png",
    images: ["/tgmi3ah.png"],
    link: "https://tagmi3ah.vercel.app/",
    longDescription:
      "Tajmi3ah is a niche e-commerce powerhouse tailored for PC enthusiasts. It leverages AI-driven recommendations to help users curate the perfect hardware configurations that are both compatible and high-performing. Beyond standard shopping cart functionality, the platform features advanced product filtering and a sleek, fast-loading interface built with Next.js. My focus was on delivering a premium shopping experience with smooth animations and a highly responsive design.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Context API"],
    role: "Frontend Developer",
    year: "2025",
    github: "https://github.com/Mazin-emad/tagmi3ah",
  },
  {
    title: "StafflyHR.tech",
    description: "Frontend Dev.",
    bgImage: "/staffly.png",
    images: ["/staffly.png"],
    link: "https://stafflyhr.tech",
    longDescription:
      "An HR management platform designed to streamline hiring and employee management workflows. Includes dashboards, role-based access, and a polished user interface for HR professionals.",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    role: "Frontend Developer",
    year: "2026",
    github: "https://github.com/Mazin-emad",
  },
  {
    title: "Anime Frog",
    description: "Desktop App Dev.",
    bgImage: "/anime-frog/SEARCH.png",
    images: [
      "/anime-frog/SEARCH.png",
      "/anime-frog/search2.png",
      "/anime-frog/anime-page.png",
      "/anime-frog/anime-datails.png",
      "/anime-frog/list-page.png",
      "/anime-frog/lists.png",
      "/anime-frog/FAV.png",
      "/anime-frog/settings.png",
      "/anime-frog/white.png",
    ],
    link: "https://github.com/Mazin-emad",
    longDescription:
      "Anime Frog is a feature-rich desktop application I built in my free time, combining my love for anime with my passion for development. Powered by the AniList GraphQL API, it delivers a comprehensive anime browsing experience. Users can search and explore a vast anime catalog, view detailed information on any title, manage personal watchlists, track favorites, and tweak app preferences through a dedicated settings panel. The entire app was built with Electron, giving it a native desktop feel with a polished, responsive UI — all crafted without a backend, driven purely by GraphQL queries.",
    technologies: ["Electron", "React", "AniList GraphQL API", "CSS Modules"],
    role: "Desktop App Developer",
    year: "2025",
    github: "https://github.com/Mazin-emad",
  },
  {
    title: "Tutorial Dose",
    description: "Full Stack Dev.",
    bgImage: "/tutorial-dose.png",
    images: ["/tutorial-dose.png"],
    link: "https://tutorial-dose.vercel.app/",
    longDescription:
      "A sophisticated full-stack learning management system designed for the modern developer. Tutorial Dose empowers users to discover, share, and manage high-quality programming tutorials. It features secure user authentication and a dynamic content management system. A standout feature is the integration of Cohere AI for generating AI-powered voice lessons, transforming static text into immersive auditory learning experiences. Built with the MERN stack for scalability and performance.",
    technologies: ["Next.js", "SupaBase DB", "Clerk", "SQL", "Tailwind CSS"],
    role: "Full Stack Developer",
    year: "2025",
    github: "https://github.com/Mazin-emad",
  },
  {
    title: "Assuit Motorsport",
    description: "Frontend Dev.",
    bgImage: "/assuit-motorsport.png",
    images: ["/assuit-motorsport.png"],
    link: "https://assiut-motorsport.netlify.app/",
    longDescription:
      "A dynamic website for the Assiut Motorsport team, showcasing team achievements, events, and members. Features a gallery section, team roster, and event timeline with engaging animations.",
    technologies: ["React", "CSS Modules", "Framer Motion"],
    role: "Frontend Developer",
    year: "2023",
    github: "https://github.com/Mazin-emad",
  },
  {
    title: "Mazin Blog",
    description: "Full Stack Dev.",
    bgImage: "/blog.png",
    images: ["/blog.png"],
    link: "https://mazin-blog.netlify.app/",
    longDescription:
      "A personal blogging platform with a full content management system. Supports creating, editing, and deleting posts with a rich text editor, user authentication, and a responsive reading experience.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    role: "Full Stack Developer",
    year: "2022",
    github: "https://github.com/Mazin-emad",
  },
  {
    title: "Job Killers",
    description: "Full Stack Dev.",
    bgImage: "/job-killers.png",
    images: ["/job-killers.png"],
    link: "https://job-killers.vercel.app/",
    longDescription:
      "A job search and listing platform that connects employers with job seekers. Features advanced search filters, job posting capabilities, and a clean, intuitive interface for browsing opportunities.",
    technologies: ["Vue.js", "TS", "Bootstrap", "Node.js", "MongoDB"],
    role: "Full Stack Developer",
    year: "2023",
    github: "https://github.com/Mazin-emad",
  },
  {
    title: "Budget App",
    description: "Full Stack Dev.",
    bgImage: "/budget-app.png",
    images: ["/budget-app.png"],
    link: "https://mazin-budget-app.netlify.app/",
    longDescription:
      "A personal finance tracker that helps users manage their income and expenses. Features budget categories, spending visualizations, and a clean dashboard for monitoring financial health.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    role: "Full Stack Developer",
    year: "2023",
    github: "https://github.com/Mazin-emad",
  },
  {
    title: "tvFlix",
    description: "Frontend Dev.",
    bgImage: "/tvFlix.png",
    images: ["/tvFlix.png"],
    link: "https://tvflix-opal.vercel.app/",
    longDescription:
      "A movie and TV show discovery app powered by a third-party API. Features search, genre filtering, detailed show pages, and a Netflix-inspired UI with smooth transitions and a responsive grid layout.",
    technologies: ["React", "TMDB API", "CSS", "React Router"],
    role: "Frontend Developer",
    year: "2022",
    github: "https://github.com/Mazin-emad",
  },
  {
    title: "My Old Portfolio",
    description: "Frontend Dev.",
    bgImage: "/old-portfolio.png",
    images: ["/old-portfolio.png"],
    link: "https://Mazin-emad.github.io/profile/",
    longDescription:
      "My first personal portfolio website, built with vanilla HTML, CSS, and JavaScript. A milestone project that marked the beginning of my web development journey.",
    technologies: ["HTML", "CSS", "JavaScript", "Git", "GitHub Pages"],
    role: "Frontend Developer",
    year: "2023",
    github: "https://github.com/Mazin-emad",
  },
  {
    title: "Todo App",
    description: "Frontend Dev.",
    bgImage: "/todo.png",
    images: ["/todo.png"],
    link: "https://todo-react-v2-nine.vercel.app/",
    longDescription:
      "A feature-rich todo application with task creation, editing, completion tracking, and local storage persistence. Built as a React practice project with a focus on state management and clean component architecture.",
    technologies: ["React", "CSS", "LocalStorage"],
    role: "Frontend Developer",
    year: "2022",
    github: "https://github.com/Mazin-emad",
  },
];
export const serviceData = [
  {
    icon: <FaGlobe />,
    title: "Web Development",
    description: "Web development is the process of building websites.",
    link: "https://en.wikipedia.org/wiki/Web_development",
  },
  {
    icon: <FaMobileAlt />,
    title: "Mobile App",
    description:
      "Mobile app development involves creating software for mobile devices.",
    link: "https://en.wikipedia.org/wiki/Mobile_app_development",
  },
  {
    icon: <FaServer />,
    title: "Backend Development",
    description:
      "Backend development is the process of building the server-side services.",
    link: "https://en.wikipedia.org/wiki/Back-end_web_development",
  },
  {
    icon: <FaDesktop />,
    title: "Desktop App",
    description:
      "Desktop app development is the process of creating software for desktop devices.",
    link: "https://en.wikipedia.org/wiki/Desktop_application",
  },
];

export const infoList = [
  {
    icon: <IoCodeSlashOutline className="text-3xl" />,
    title: "Tech Stack",
    description: "Typescript, React Js, Next Js, Node Js",
  },
  {
    icon: <FaUserGraduate className="text-3xl" />,
    title: "Education",
    description: "Final-year student at EELU· Graduating in 2026",
  },
  {
    icon: <FaProjectDiagram className="text-3xl" />,
    title: "Projects",
    description: "Built more than 15 web projects",
  },
];

export const toolsList = [
  assets.vscode,
  assets.firebase,
  assets.mongodb,
  assets.figma,
  assets.git,
];
