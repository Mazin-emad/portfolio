"use client";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useEffect, useState, useCallback } from "react";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 40,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 40,
    transition: { duration: 0.2 },
  },
};

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: { duration: 0.2 },
  }),
};

// --- Image Carousel ---
const ImageCarousel = ({ images }) => {
  const [[activeIndex, direction], setPage] = useState([0, 0]);

  const paginate = useCallback(
    (newDirection) => {
      setPage(([prev]) => {
        const next =
          (prev + newDirection + images.length) % images.length;
        return [next, newDirection];
      });
    },
    [images.length]
  );

  const goTo = (index) => {
    setPage(([prev]) => [index, index > prev ? 1 : -1]);
  };

  // Reset index when images change (new project opened)
  useEffect(() => {
    setPage([0, 0]);
  }, [images]);

  const hasMultiple = images.length > 1;

  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-t-2xl bg-black/20 select-none">
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={activeIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <Image
            src={images[activeIndex]}
            alt={`Project screenshot ${activeIndex + 1}`}
            fill
            className="object-cover object-center"
            sizes="(max-width: 672px) 100vw, 672px"
            priority={activeIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />

      {/* Arrow buttons — only shown when multiple images */}
      {hasMultiple && (
        <>
          <button
            onClick={() => paginate(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors duration-200 backdrop-blur-sm"
            aria-label="Previous image"
          >
            <MdChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors duration-200 backdrop-blur-sm"
            aria-label="Next image"
          >
            <MdChevronRight className="text-2xl" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {hasMultiple && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-5 h-2 bg-white"
                  : "w-2 h-2 bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      )}

      {/* Image counter badge */}
      {hasMultiple && (
        <div className="absolute top-4 left-4 z-20 text-xs font-outfit text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {activeIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

// --- Main Modal ---
const ProjectModal = ({ project, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Build the images array: prefer project.images[], fall back to bgImage
  const images =
    project?.images && project.images.length > 0
      ? project.images
      : project?.bgImage
      ? [project.bgImage]
      : [];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative z-10 bg-white dark:bg-[#1a0030] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white cursor-pointer transition-colors duration-200"
              aria-label="Close modal"
            >
              <IoCloseSharp className="text-xl" />
            </button>

            {/* Image Carousel */}
            {images.length > 0 && <ImageCarousel images={images} />}

            {/* Body */}
            <div className="p-6 sm:p-8">
              {/* Title & Year Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <h2 className="text-2xl sm:text-3xl font-bold font-outfit">
                  {project.title}
                </h2>
                <span className="text-sm font-outfit text-myGray bg-hover dark:bg-white/10 px-3 py-1 rounded-full w-fit">
                  {project.year}
                </span>
              </div>

              {/* Role Badge */}
              <p className="text-sm font-outfit text-myGray mb-5">
                {project.role}
              </p>

              {/* Description */}
              <p className="text-myGray leading-7 mb-6 font-ovo">
                {project.longDescription || project.description}
              </p>

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold font-outfit uppercase tracking-wider text-myGray mb-3">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-sm font-outfit px-3 py-1.5 rounded-full border border-gray-300 dark:border-white/20 bg-hover dark:bg-white/5 hover:shadow-ma hover:-translate-y-0.5 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-outfit text-sm font-medium hover:opacity-90 transition-opacity duration-200"
                >
                  Live Demo
                  <FiExternalLink className="text-lg" />
                </a>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-400 dark:border-white/30 font-outfit text-sm font-medium hover:bg-hover dark:hover:bg-white/10 transition-colors duration-200"
                >
                  Source Code
                  <FiExternalLink className="text-lg" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
