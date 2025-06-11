"use client";

import Image from "next/image";
import { assets } from "@/assets/assets";
import { useState, useEffect } from "react";
import { FaBars, FaRegMoon, FaRegSun } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FiArrowUpRight } from "react-icons/fi";

const navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
    addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }, []);

  const handleTheme = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
    setIsDark(!isDark);
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <>
      <div className="fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden">
        <Image
          src={assets.header_bg_color}
          alt="background"
          className="w-full"
        />
      </div>

      <nav
        className={`flex fixed justify-between z-50 items-center w-full px-5 py-4 lg:px-8 xl:px-[8%]
      ${
        isScrolled
          ? "bg-white/20 dark:bg-theme dark:shadow-white/20 backdrop-blur-lg shadow-sm"
          : ""
      }`}
      >
        <a href="" className="text-3xl font-bold font-outfit">
          Mazin<span className="text-red-500"> .</span>
        </a>
        <ul
          className={` hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3
          ${
            isScrolled
              ? ""
              : "bg-white/45 shadow-sm dark:bg-transparent dark:border dark:border-white/50"
          }`}
        >
          <li>
            <a href="#top">Home</a>
          </li>
          <li>
            <a href="#about">About me</a>
          </li>
          <li>
            <a href="#projects">My work</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <button className="text-2xl cursor-pointer" onClick={handleTheme}>
            {isDark ? <FaRegSun /> : <FaRegMoon />}
          </button>

          <a
            href="#contact"
            className="hidden border ml-4 border-gray-500 rounded-full py-2.5 px-10 md:flex items-center gap-3"
          >
            Contact <FiArrowUpRight className="text-2xl" />
          </a>

          <button className="block md:hidden ml-3" onClick={handleOpen}>
            <FaBars className="text-2xl cursor-pointer" />
          </button>
        </div>

        {/* Mobile Menu */}
        <ul
          className={`bg-rose-50 dark:bg-hover bottom-0 w-64 z-50 transition-all duration-500 shadow-md fixed top-0 -right-64 h-screen gap-4 flex flex-col md:hidden px-10 py-20 ${
            isOpen ? "right-0" : "-right-64"
          }`}
        >
          <button
            className="absolute text-2xl cursor-pointer top-6 right-6"
            onClick={handleClose}
          >
            <IoCloseSharp />
          </button>

          <li>
            <a onClick={handleClose} href="#top">
              Home
            </a>
          </li>
          <li>
            <a onClick={handleClose} href="#about">
              About Me
            </a>
          </li>
          <li>
            <a onClick={handleClose} href="#projects">
              Projects
            </a>
          </li>
          <li>
            <a onClick={handleClose} href="#services">
              Services
            </a>
          </li>
          <li>
            <a onClick={handleClose} href="#contact">
              Contact Me
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default navbar;
