"use client";
import { workData } from "@/assets/assets";
import { useState } from "react";
import { BsSendFill } from "react-icons/bs";
import { FaCloudDownloadAlt, FaCloudUploadAlt } from "react-icons/fa";
import { motion } from "motion/react";
import SectionWrapper from "./SectionWrapper";

const Portfolio = () => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <SectionWrapper
      title="My Latest Works"
      description="Welcome to my web development portfolio! Explore a collection of
        projects showcasing my skills in front-end development."
      subtitle="Portfolio"
      id="projects"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="grid grid-cols-mazin gap-5 my-10"
        viewport={{ once: true }}
      >
        {workData
          .slice(0, showMore ? workData.length : 4)
          .map((item, index) => (
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              key={index}
              className="aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative group"
              style={{ backgroundImage: `url(${item.bgImage})` }}
            >
              <a
                href={item.link}
                target="_blank"
                className="bg-white dark:bg-hover w-10/12 cursor-pointer rounded-md py-3 duration-500 group-hover:bottom-7  px-5 absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-between items-center"
              >
                <div>
                  <h2 className="font-semibold font-outfit">{item.title}</h2>
                  <p className="text-sm text-myGray font-outfit">
                    {item.description}
                  </p>
                </div>
                <div className="border border-black dark:border-white rounded-full w-9 group-hover:bg-lime-300 duration-400 aspect-square flex items-center justify-center shadow-[2px_2px_0_black] dark:shadow-[2px_2px_0_white]">
                  <BsSendFill className="text-xl" />
                </div>
              </a>
            </motion.div>
          ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        onClick={handleShowMore}
        className="w-max font-outfit border-[0.5px] border-myGray text-myGray bg-white dark:text-black hover:bg-lime-300 duration-400 flex items-center cursor-pointer gap-2 rounded-full px-5 py-2 mx-auto"
        viewport={{ once: true }}
      >
        {showMore ? (
          <>
            Show Less <FaCloudUploadAlt className="text-xl" />
          </>
        ) : (
          <>
            Show More <FaCloudDownloadAlt className="text-xl" />
          </>
        )}
      </motion.button>
    </SectionWrapper>
  );
};

export default Portfolio;
