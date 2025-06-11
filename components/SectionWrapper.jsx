import { motion } from "motion/react";

const SectionWrapper = ({ children, title, description, subtitle, id }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id={id}
      className="px-[12%] py-10 w-full scroll-mt-20"
      viewport={{ once: true }}
    >
      <motion.h4
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-lg font-ovo text-center mb-2"
        viewport={{ once: true }}
      >
        {subtitle}
      </motion.h4>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-5xl font-ovo text-center"
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        viewport={{ once: true }}
        className="text-center text-myGray mt-5 mb-12 max-w-2xl mx-auto"
      >
        {description}
      </motion.p>
      {children}
    </motion.div>
  );
};

export default SectionWrapper;
