"use client";

import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function ClientLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.className} ${playfair.className} bg-theme duration-300 text-myText antialiased leading-8 overflow-x-hidden`}
      >
        {children}
        <Analytics />
        <style jsx global>{`
          h1, h2, h3, h4, h5, h6 {
            font-family: '${playfair.style.fontFamily}';
          }
        `}</style>
      </body>
    </html>
  );
}