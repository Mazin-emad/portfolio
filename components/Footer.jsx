import { FaRegEnvelope } from "react-icons/fa";
import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col justify-between items-center w-full px-5 pt-20 lg:px-8 xl:px-[8%]">
      <a href="" className="text-3xl font-bold font-outfit">
        Mazin<span className="text-red-500"> .</span>
      </a>
      <a
        href="mailto:mazin0emd@gmail.com"
        className="text-md flex items-center text-myGray gap-2 mt-2"
      >
        <FaRegEnvelope className="text-xl" />
        mazin0emd@gmail.com
      </a>
      <div className="flex items-center flex-col sm:flex-row justify-between w-full mt-8 border-t border-gray-500 py-4">
        <p className="text-sm order-2 mt-2 sm:mt-0 sm:order-1">
          &copy; {new Date().getFullYear()} Mazin Emad. All rights reserved.
        </p>
        <div className="flex items-center gap-5 order-1 sm:order-2">
          <a target="_blank" href="https://x.com/MazinEmad685945">
            Twitter
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/mazin-emad10l10">
            LinkedIn
          </a>
          <a target="_blank" href="https://github.com/Mazin-emad">
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
