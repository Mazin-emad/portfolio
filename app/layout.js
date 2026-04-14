import { Outfit, Ovo } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ovo = Ovo({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "Mazin Emad | Software Engineer",
  description:
    "Portfolio of Mazin Emad, a Software Engineer and Frontend Developer from Egypt. Explore my web development projects, skills, and resume.",
  keywords: [
    "Mazin Emad",
    "Portfolio",
    "Software Engineer",
    "Frontend Developer",
    "Full Stack Developer",
    "Web Development",
    "React",
    "Next.js",
    "Tailwind CSS",
    "JavaScript",
    "TypeScript",
    "Egypt"
  ],
  authors: [{ name: "Mazin Emad" }],
  creator: "Mazin Emad",
  metadataBase: new URL("https://mazin-emad.netlify.app/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mazin-emad.netlify.app/",
    title: "Mazin Emad | Software Engineer",
    description:
      "Welcome to my portfolio! I'm a Software Engineer who loves building elegant, user-friendly web experiences.",
    siteName: "Mazin Emad Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mazin Emad - Portfolio & Resume",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mazin Emad | Software Engineer",
    description:
      "Software Engineer & Frontend Developer from Egypt specializing in React, Next.js, and modern web environments.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${outfit.className} ${ovo.className} bg-theme duration-300 text-myText antialiased leading-8 overflow-x-hidden`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
