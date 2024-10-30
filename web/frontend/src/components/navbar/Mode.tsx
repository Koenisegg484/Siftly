import React from "react";
import { useTheme } from "../../utils/ThemeProvider";

const Mode: React.FC = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const handleToggle = () => {
    setIsDarkMode((prevMode) => {
      console.log("Toggling dark mode:", !prevMode);
      return !prevMode;
    });
    console.log(isDarkMode);
  };
  return (
    <div onClick={handleToggle} className="flex">
      <label className="relative inline-flex items-center cursor-pointer">
        <input className="sr-only peer" type="checkbox" />
        <div className="w-14 h-5 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center before:content-['☀️'] before:absolute before:h-5 before:w-6 before:top-1/2 before:bg-white before:rounded-full before:left-1 before:-translate-y-1/2 before:transition-all before:duration-500 peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full shadow-gray-400 peer-checked: peer-checked:shadow-gray-700 peer-checked:bg-[#383838] after:content-['🌑'] after:absolute after:bg-[#1d1d1d] after:rounded-full after:top-[1px] after:right-[2px] after:translate-y-full after:w-6 after:h-5 after:opacity-0 after:transition-all after:duration-500 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-0" />
      </label>
    </div>
  );
};

export default Mode;
