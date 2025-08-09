import React from "react";
import { PiSelectionBackgroundBold } from "react-icons/pi";

export default function BgButton({ onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 bg-white text-black rounded-xl px-2 flex-row-reverse outline-none py-2 sm:hover:bg-transparent sm:hover:backdrop-blur-sm sm:hover:text-white transition-colors duration-300 sm:hover:border-white border border-transparent">
      <PiSelectionBackgroundBold className="text-2xl" />
      Select Background
    </button>
  );
}
