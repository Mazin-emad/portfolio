import { Outfit, Ovo } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ovo = Ovo({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "Mazin Emad",
  description:
    "Mazin Emad Portfolio, Web Developer, Software Engineer skilled in React, JavaScript, and Node.js. Explore my projects, skills, and resume.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.className} ${ovo.className} bg-theme duration-300 text-myText antialiased leading-8 overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
