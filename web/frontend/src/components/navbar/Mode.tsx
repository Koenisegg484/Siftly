import React from "react";
import { useTheme } from "../../utils/ThemeProvider";

const Mode: React.FC = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();

  const handleToggle = () => {
    setIsDarkMode((prevMode) => {
      console.log("Current mode:", prevMode); // Debug log
      console.log("Switching to:", !prevMode); // Debug log
      return !prevMode;
    });
  };
  return (
    <div className="flex">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={handleToggle}
        />
        <div className="w-12 h-5 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center  shadow-gray-400 peer-checked:bg-[#383838] after:content-['☀️'] after:absolute  after:rounded-full after:right-[2px] after:w-6 after:h-5 after:transition-all after:duration-500 after:-translate-x-full peer-checked:after:content-['🌙'] peer-checked:after:translate-x-0" />

      </label>
    </div>
  );
};

export default Mode;
