"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiFilePaperLine } from "react-icons/ri";
import { motion } from "motion/react";

const Header = () => {
  return (
    <div className="h-[calc(100vh+60px)] flex justify-center items-center flex-col gap-4 mx-auto text-center w-11/12 max-w-3xl">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="w-32 h-32 rounded-full overflow-hidden"
      >
        <Image
          src={assets.profile_img}
          alt="Mazin Emad image"
          className="object-cover translate-y-[0.5px]"
        />
      </motion.div>
      <motion.h3
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-xl md:2xl items-end font-Ovo flex mb-3 gap-2"
      >
        Hi, I'm Mazin Emad 👋🏻
      </motion.h3>
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-6xl lg:text-[66px] font-Ovo"
      >
        I'm a Software Engineer from Egypt
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="max-w-2xl mx-auto text-center text-md text-myGray sm:text-lg font-Ovo"
      >
        I’m a software engineer who loves turning ideas into elegant,
        user-friendly web experiences — blending functionality with thoughtful
        design.
      </motion.p>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="flex flex-col sm:flex-row gap-4 mt-4"
      >
        <a
          href="#contact"
          className="border font-outfit border-white bg-black dark:bg-white/95 dark:hover:bg-white/100 dark:text-black text-white px-10 py-3 rounded-full flex items-center gap-3"
        >
          Contact Me <FaArrowRightLong />
        </a>
        <motion.a
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
          href="/Mazin_Emad_CV.pdf"
          target="_blank"
          className="border font-outfit border-myGray px-10 py-3 rounded-full flex items-center gap-3"
        >
          My Resume
          <RiFilePaperLine className="text-xl" />
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Header;
