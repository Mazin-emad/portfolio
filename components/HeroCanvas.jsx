"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function HeroCanvas() {
  const [gradient, setGradient] = useState(0);

  useEffect(() => {
    const handler = setInterval(() => {
      setGradient((prev) => (prev + 0.002) % 1);
    }, 50);
    return () => clearInterval(handler);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${gradient * 360}deg, #f8f9fa 0%, #e2e8f0 50%, #f8f9fa 100%)`,
          backgroundSize: "200% 200%",
          animation: "gradientShift 12s ease infinite",
        }}
      ></div>
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="w-[120px] h-[120px] rounded-full border border-soft/50 bg-white/5 backdrop-blur-sm"></div>
      </motion.div>
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
}
