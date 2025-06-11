import { serviceData } from "@/assets/assets";
import { motion } from "motion/react";
import { FaArrowRightLong } from "react-icons/fa6";
import SectionWrapper from "./SectionWrapper";

const Services = () => {
  return (
    <SectionWrapper
      title="My Services"
      description="I offer a wide range of services to help you achieve your business
        goals, and I am always looking to improve my skills."
      subtitle="What I offer"
      id="services"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="grid grid-cols-mazin gap-6 my-10"
        viewport={{ once: true }}
      >
        {serviceData.map((item, index) => (
          <motion.div
            whileHover={{ scale: 1.01 }}
            key={index}
            className="border border-gray-400 rounded-xl dark:border-white px-8 py-12 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-ma hover:bg-hover duration-500"
          >
            <div className="text-2xl bg-[#FF388B] w-12 h-12 flex items-center justify-center rounded-xl text-white">
              {item.icon}
            </div>
            <h3 className="text-md sm:text-lg font-semibold font-outfit">
              {item.title}
            </h3>
            <p className="text-myGray text-sm leading-5">{item.description}</p>
            <a
              href={item.link}
              target="_blank"
              className="flex items-center gap-2 text-sm mt-5 group"
            >
              Learn More{" "}
              <FaArrowRightLong className="text-lg group-hover:translate-x-1 duration-400" />
            </a>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

export default Services;
