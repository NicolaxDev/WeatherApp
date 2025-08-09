import React from "react";
import { IoShareSocial } from "react-icons/io5";

export default function ShareButton() {
  return (
    <button className="flex items-center gap-2 bg-white text-black rounded-xl px-2 outline-none py-2 sm:hover:bg-transparent sm:hover:backdrop-blur-sm sm:hover:text-white transition-colors duration-300 sm:hover:border-white border border-transparent">
      <IoShareSocial className="text-2xl" />
      Share
    </button>
  );
}
