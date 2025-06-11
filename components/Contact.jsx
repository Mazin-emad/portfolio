"use client";
import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import SectionWrapper from "./SectionWrapper";
import { motion } from "motion/react";

const inputStyles =
  "bg-white border-2 w-full rounded-md placeholder:text-myGray border-[#A4A4A4] dark:bg-hover outline-none px-4 py-2 dark:border-white/90 dark:bg-hover/30";

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
  success: "text-green-500",
  error: "text-red-500",
  loading: "text-gray-700 dark:text-white",
};

const Contact = () => {
  const [result, setResult] = useState("");
  const [flag, setFlag] = useState("loading");

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target.name.value);
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
      setResult("Massage must be at least 10 characters long");
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
      setResult("Form Submitted Successfully");
      setFlag("success");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
      setFlag("error");
    }
  };

  return (
    <SectionWrapper
      title="Get In Touch"
      description="I'd love to hear from you! If you have any questions, comments or
        feedback, please use the form below"
      subtitle="Contact"
      id="contact"
    >
      <motion.form
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="flex flex-col mx-auto max-w-xl gap-4 md:gap-8"
        onSubmit={onSubmit}
        viewport={{ once: true }}
      >
        <div className="flex flex-col sm:flex-row gap-4 md:gap-8">
          <motion.input
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            className={inputStyles}
          />
          <motion.input
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            type="email"
            id="email"
            name="email"
            className={inputStyles}
            placeholder="Your email"
          />
        </div>

        <motion.textarea
          initial={{ y: 90, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          name="massage"
          id="massage"
          className={inputStyles}
          placeholder="Your message"
          rows="6"
        ></motion.textarea>

        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          viewport={{ once: true }}
          type="submit"
          className="border dark:bg-transparent dark:hover:bg-hover w-fit mx-auto mt-3 font-outfit cursor-pointer flex items-center gap-2 bg-black/80 hover:bg-black/100 duration-400 text-white rounded-full px-5 py-2"
        >
          Send Massage
          <FaArrowRightLong className="text-xl" />
        </motion.button>
        {result && (
          <p className={`text-center -mt-5 font-outfit ${flagColors[flag]}`}>
            {result}
          </p>
        )}
      </motion.form>
    </SectionWrapper>
  );
};

export default Contact;
