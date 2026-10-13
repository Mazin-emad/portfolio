"use client";
import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import SectionWrapper from "./SectionWrapper";
import { motion } from "motion/react";

const inputStyles =
  "bg-white/80 backdrop-blur-sm border border-line/30 rounded-xl placeholder:text-muted/60 focus:outline-none focus:border-accent/50 px-6 py-3 w-full transition-all duration-300";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateName = (name) => {
  return name.length > 2;
};

const validateMassage = (massage) => {
  return massage.length > 10;
};

const flagColors = {
  success: "text-success/80",
  error: "text-red-500/80",
  loading: "text-muted/60",
};

const Contact = () => {
  const [result, setResult] = useState("");
  const [flag, setFlag] = useState("loading");

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validateName(event.target.name.value)) {
      setResult("Name must be at least 3 characters long");
      setFlag("error");
      return;
    }
    if (!validateEmail(event.target.email.value)) {
      setResult("Invalid email address");
      setFlag("error");
      return;
    }
    if (!validateMassage(event.target.massage.value)) {
      setResult("Message must be at least 10 characters long");
      setFlag("error");
      return;
    }

    setResult("Sending....");
    setFlag("loading");
    const formData = new FormData(event.target);

    formData.append("access_key", "c8ec45ad-6634-4cce-a196-0ff3160f8e7e");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Message sent successfully!");
      setFlag("success");
      event.target.reset();
    } else {
      setResult("Failed to send message. Please try again.");
      setFlag("error");
    }
  };

  return (
    <SectionWrapper
      title="Get In Touch"
      description="I'd love to hear from you! If you have any questions, comments or feedback, please use the form below"
      subtitle="Contact"
      id="contact"
    >
      <motion.form
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col mx-auto max-w-2xl gap-6"
        onSubmit={onSubmit}
        viewport={{ once: true }}
      >
        <div className="flex flex-col sm:flex-row gap-6">
          <motion.input
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            className={inputStyles}
          />
          <motion.input
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
            className={inputStyles}
          />
        </div>

        <motion.textarea
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          name="massage"
          id="massage"
          placeholder="Your message"
          className={inputStyles}
          rows="5"
        ></motion.textarea>

        <motion.button
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          viewport={{ once: true }}
          type="submit"
          className="flex items-center justify-center px-8 py-3 bg-ink text-white rounded-lg font-medium hover:bg-ink/90 transition-all duration-300"
        >
          Send Message <FaArrowRightLong className="ml-2 w-4 h-4" />
        </motion.button>
        {result && (
          <p className={`mt-6 text-center ${flagColors[flag]}`}>
            {result}
          </p>
        )}
      </motion.form>
    </SectionWrapper>
  );
};

export default Contact;
