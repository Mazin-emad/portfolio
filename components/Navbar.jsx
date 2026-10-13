"use client";

import Image from "next/image";
import { assets } from "../assets/assets.js";
import { useState, useEffect } from "react";
import { FaBars, FaRegMoon, FaRegSun } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FiArrowUpRight } from "react-icons/fi";

const Navbar = () => {
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
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    <div>
      <div className="fixed inset-0 pointer-events-none">
        <Image
          src={assets.header_bg_color}
          alt=""
          className="w-full h-[80vh] -translate-y-[30%] opacity-20"
        />
      </div>

      <nav
        className={`fixed inset-0 z-50 flex h-[4.5rem] items-center justify-between px-6 lg:px-8
      ${
        isScrolled
          ? "bg-white/90 backdrop-blur-sm border-b border-line/20"
          : "bg-white/50 backdrop-blur-sm"
      }`}
      >
        <a href="#top" className="flex items-center gap-2">
          <span className="text-xl font-semibold text-ink">ME</span>
          <span className="text-accent text-base">°</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          <a
            href="#about"
            className="text-muted hover:text-ink transition-colors duration-300"
          >
            About
          </a>
          <a
            href="#work"
            className="text-muted hover:text-ink transition-colors duration-300"
          >
            Work
          </a>
          <a
            href="#capabilities"
            className="text-muted hover:text-ink transition-colors duration-300"
          >
            Capabilities
          </a>
          <a
            href="#contact"
            className="text-muted hover:text-ink transition-colors duration-300"
          >
            Contact
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="text-accent hover:text-ink/80 transition-colors duration-300 p-2 rounded"
            onClick={handleTheme}
          >
            {isDark ? <FaRegSun className="w-5 h-5" /> : <FaRegMoon className="w-5 h-5" />}
          </button>

          <a
            href="#contact"
            className="flex items-center gap-2 text-sm font-medium text-ink hover:text-accent transition-colors duration-300"
          >
            Contact <FiArrowUpRight className="w-4 h-4" />
          </a>

          <button
            className="md:hidden p-2 rounded"
            onClick={handleOpen}
          >
            <FaBars className="w-5 h-5 text-ink" />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 z-40 flex items-center justify-center hidden md:hidden
          ${isOpen ? "flex" : "hidden"}
          backdrop-blur-sm bg-white/90`}
        >
          <div className="relative w-[90%] max-w-[24rem] space-y-6">
            <button
              className="absolute right-0 top-0 -translate-x-4 -translate-y-4 w-8 h-8 rounded-full hover:bg-line/20 transition-colors duration-300"
              onClick={handleClose}
            >
              <IoCloseSharp className="w-4 h-4 text-ink" />
            </button>

            <nav className="space-y-4">
              <a
                href="#top"
                className="block text-center text-lg font-medium text-ink hover:text-accent transition-colors duration-300"
              >
                Home
              </a>
              <a
                href="#about"
                className="block text-center text-lg font-medium text-ink hover:text-accent transition-colors duration-300"
              >
                About
              </a>
              <a
                href="#work"
                className="block text-center text-lg font-medium text-ink hover:text-accent transition-colors duration-300"
              >
                Work
              </a>
              <a
                href="#capabilities"
                className="block text-center text-lg font-medium text-ink hover:text-accent transition-colors duration-300"
              >
                Capabilities
              </a>
              <a
                href="#contact"
                className="block text-center text-lg font-medium text-ink hover:text-accent transition-colors duration-300"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
