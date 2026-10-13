import { motion } from "motion/react";

const SectionWrapper = ({ children, title, description, subtitle, id }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      id={id}
      className="px-6 lg:px-8 pt-16 pb-20 w-full"
      viewport={{ once: true }}
    >
      <motion.h4
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-2 text-muted uppercase tracking-wider text-sm font-medium"
        viewport={{ once: true }}
      >
        {subtitle}
      </motion.h4>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mb-6 text-3xl md:text-4xl lg:text-5xl text-ink font-serif font-bold"
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="text-center text-muted max-w-2xl mx-auto mb-12"
      >
        {description}
      </motion.p>
      {children}
    </motion.div>
  );
};

export default SectionWrapper;
