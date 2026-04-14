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
    title: "RaiZero.com",
    description: "Frontend Dev.",
    bgImage: "/raizero.png",
    link: "https://raizero.com",
    longDescription:
      "A professional company website for RaiZero, built with modern frontend technologies. Features a sleek landing page with smooth animations, responsive layouts, and optimized performance for a seamless user experience.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    role: "Frontend Developer",
    year: "2024",
    github: "https://github.com/Mazin-emad",
  },
  {
    title: "Tgim3ah Ecommerce",
    description: "Frontend Dev.",
    bgImage: "/tgmi3ah.png",
    link: "https://tagmi3ah.vercel.app/",
    longDescription:
      "A full-featured ecommerce platform with product listings, shopping cart functionality, and a clean checkout flow. Built with a focus on performance, accessibility, and a modern shopping experience.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Context API"],
    role: "Frontend Developer",
    year: "2024",
    github: "https://github.com/Mazin-emad/tagmi3ah",
  },
  {
    title: "StafflyHR.tech",
    description: "Frontend Dev.",
    bgImage: "/staffly.png",
    link: "https://stafflyhr.tech",
    longDescription:
      "An HR management platform designed to streamline hiring and employee management workflows. Includes dashboards, role-based access, and a polished user interface for HR professionals.",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    role: "Frontend Developer",
    year: "2024",
    github: "https://github.com/Mazin-emad",
  },
  {
    title: "Tutorial Dose",
    description: "Full Stack Dev.",
    bgImage: "/tutorial-dose.png",
    link: "https://tutorial-dose.vercel.app/",
    longDescription:
      "A full-stack educational platform for discovering and sharing programming tutorials. Features user authentication, content management, and a searchable catalog of learning resources.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    role: "Full Stack Developer",
    year: "2024",
    github: "https://github.com/Mazin-emad",
  },
  {
    title: "Assuit Motorsport",
    description: "Frontend Dev.",
    bgImage: "/assuit-motorsport.png",
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
    link: "https://mazin-blog.netlify.app/",
    longDescription:
      "A personal blogging platform with a full content management system. Supports creating, editing, and deleting posts with a rich text editor, user authentication, and a responsive reading experience.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    role: "Full Stack Developer",
    year: "2023",
    github: "https://github.com/Mazin-emad",
  },
  {
    title: "Job Killers",
    description: "Full Stack Dev.",
    bgImage: "/job-killers.png",
    link: "https://job-killers.vercel.app/",
    longDescription:
      "A job search and listing platform that connects employers with job seekers. Features advanced search filters, job posting capabilities, and a clean, intuitive interface for browsing opportunities.",
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    role: "Full Stack Developer",
    year: "2024",
    github: "https://github.com/Mazin-emad",
  },
  {
    title: "Budget App",
    description: "Full Stack Dev.",
    bgImage: "/budget-app.png",
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
    link: "https://tvflix-opal.vercel.app/",
    longDescription:
      "A movie and TV show discovery app powered by a third-party API. Features search, genre filtering, detailed show pages, and a Netflix-inspired UI with smooth transitions and a responsive grid layout.",
    technologies: ["React", "TMDB API", "CSS", "React Router"],
    role: "Frontend Developer",
    year: "2023",
    github: "https://github.com/Mazin-emad",
  },
  {
    title: "My Old Portfolio",
    description: "Frontend Dev.",
    bgImage: "/old-portfolio.png",
    link: "https://Mazin-emad.github.io/profile/",
    longDescription:
      "My first personal portfolio website, built with vanilla HTML, CSS, and JavaScript. A milestone project that marked the beginning of my web development journey.",
    technologies: ["HTML", "CSS", "JavaScript"],
    role: "Frontend Developer",
    year: "2022",
    github: "https://github.com/Mazin-emad",
  },
  {
    title: "Todo App",
    description: "Frontend Dev.",
    bgImage: "/todo.png",
    link: "https://todo-react-v2-nine.vercel.app/",
    longDescription:
      "A feature-rich todo application with task creation, editing, completion tracking, and local storage persistence. Built as a React practice project with a focus on state management and clean component architecture.",
    technologies: ["React", "CSS", "LocalStorage"],
    role: "Frontend Developer",
    year: "2023",
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
