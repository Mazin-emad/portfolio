import Image from "next/image";
import { assets } from "@/assets/assets";

const navbar = () => {
  return (
    <nav className="flex justify-between items-center w-full px-5 py-4 lg:px-8 xl:px-[8%]">
      <a href="" className="text-2xl font-bold">
        Mazin<span className="text-red-500">.</span>
      </a>
      <ul className="hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3">
        <li>
          <a href="#top">Home</a>
        </li>
        <li>
          <a href="#about">About Me</a>
        </li>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#services">Services</a>
        </li>
      </ul>
      <div>
        <a href="#contact" className="flex items-center gap-1">
          Contact <Image src={assets.arrow_icon} alt="arrow" className="w-3" />
        </a>
      </div>
    </nav>
  );
};

export default navbar;
