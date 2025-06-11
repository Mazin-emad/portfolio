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
        className="flex flex-col w-full lg:flex-row gap-20 my-20"
      >
        <motion.div
          className="max-w-none w-64 sm:w-80 rounded-3xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
          }}
        >
          <Image
            src={assets.user_image}
            alt="about"
            className="w-full rounded-3xl"
          />
        </motion.div>

        <motion.div
          className="flex-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.6,
          }}
        >
          <p className="max-w-2xl mb-10 text-myGray">
            I am a software engineer with a passion for building web
            applications that are both functional and aesthetically pleasing. I
            am a quick learner and I am always looking to improve my skills.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            {infoList.map((item, index) => (
              <motion.div
                whileHover={{ scale: 1.01 }}
                key={index}
                className="border-[0.5px] cursor-pointer hover:bg-hover hover:shadow-ma hover:-translate-y-1 duration-500 border-gray-400 dark:border-white rounded-xl p-6"
              >
                {item.icon}
                <h3 className="font-semibold my-4 text-myGray">{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="text-myGray my-6"
          >
            Tools I use
          </motion.h4>
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex items-center gap-3 sm:gap-5"
          >
            {toolsList.map((item, index) => (
              <motion.li
                whileHover={{ scale: 1.06 }}
                className="flex w-12 sm:w-14 aspect-square hover:-translate-y-1 duration-500 border-gray-400 dark:border-white items-center justify-center p-3 border rounded-md"
                key={index}
              >
                <Image src={item} alt={"tool" + index} className="w-5 sm:w-7" />
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
};

export default About;
