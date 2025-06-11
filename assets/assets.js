import user_image from "./mazin-test.png";
import vscode from "./vscode.png";
import firebase from "./firebase.png";
import figma from "./figma.png";
import git from "./git.png";
import mongodb from "./mongodb.png";
import profile_img from "./mazin-test.png";
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
  },
  {
    title: "Assuit Motorsport",
    description: "Frontend Dev.",
    bgImage: "/assuit-motorsport.png",
    link: "https://assiut-motorsport.netlify.app/",
  },
  {
    title: "Mazin Blog",
    description: "Full Stack Dev.",
    bgImage: "/blog.png",
    link: "https://mazin-blog.netlify.app/",
  },
  {
    title: "Budget App",
    description: "Full Stack Dev.",
    bgImage: "/budget-app.png",
    link: "https://mazin-budget-app.netlify.app/",
  },
  {
    title: "tvFlix",
    description: "Frontend Dev.",
    bgImage: "/tvFlix.png",
    link: "https://tvflix-opal.vercel.app/",
  },
  {
    title: "My Old Portfolio",
    description: "Frontend Dev.",
    bgImage: "/old-portfolio.png",
    link: "https://Mazin-emad.github.io/profile/",
  },
  {
    title: "Todo App",
    description: "Frontend Dev.",
    bgImage: "/todo.png",
    link: "https://todo-react-v2-nine.vercel.app/",
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
    description: "Built more than 10 web projects",
  },
];

export const toolsList = [
  assets.vscode,
  assets.firebase,
  assets.mongodb,
  assets.figma,
  assets.git,
];
