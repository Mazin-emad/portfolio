"use client";
import Image from "next/image";
import { assets, infoList, toolsList } from "@/assets/assets";
import { motion } from "motion/react";
import SectionWrapper from "./SectionWrapper";

const About = () => {
  return (
    <SectionWrapper title="About Me" subtitle="introduction" id="about">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex flex-col w-full lg:flex-row gap-16 my-16"
      >
        <motion.div
          className="max-w-none w-60 sm:w-72 rounded-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
          }}
        >
          <Image
            src={assets.user_image}
            alt="Mazin Emad - Software Engineer from Egypt"
            className="w-full rounded-2xl"
          />
        </motion.div>

        <motion.div
          className="flex-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.4,
          }}
        >
          <p className="max-w-2xl mb-8 text-muted">
            I am a software engineer with a passion for building web
            applications that are both functional and aesthetically pleasing. I
            am a quick learner and I am always looking to improve my skills.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid gap-6"
          >
            {infoList.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="border border-line/50 bg-white/80 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:border-line hover:bg-white/90"
              >
                {item.icon}
                <h3 className="font-semibold my-4 text-ink">{item.title}</h3>
                <p className="text-muted">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.h4
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-ink my-8"
          >
            Tools I use
          </motion.h4>
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex items-center gap-4 sm:gap-6 flex-wrap"
          >
            {toolsList.map((item, index) => (
              <motion.li
                whileHover={{ scale: 1.03 }}
                className="flex w-10 sm:w-12 aspect-square items-center justify-center p-4 border border-line/50 bg-white/80 backdrop-blur-sm rounded-lg transition-all duration-300 hover:border-line hover:bg-white/90"
                key={index}
              >
                {item.type === "icon" ? (
                  <span className="text-xl sm:text-2xl" style={{ color: item.color }}>{item.icon}</span>
                ) : (
                  <Image src={item.src} alt={item.alt} className="w-6 sm:w-8" />
                )}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
};

export default About;
