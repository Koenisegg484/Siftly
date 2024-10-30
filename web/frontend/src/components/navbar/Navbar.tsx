import React, { useState } from "react";
import Mode from "./Mode";
import Menu from "./Menu";
import {useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearInput = () => {
    setSearchTerm("");
  };

  return (
    <nav className="flex justify-between items-center bg-white px-8 py-3 shadow-md">
      <h1 className="text-xl text-gray-800 font-semibold cursor-pointer" onClick={()=>navigate({ pathname: '/' })}>Siftly</h1>
      <div className="flex items-center flex-grow mx-4">
        <div className="flex items-center w-full max-w-md mx-auto">
          <div className="relative w-full">
            <input
              className="w-full border border-gray-500 rounded-3xl py-2 px-12 focus:outline-none focus:border-blue-500"
              type="text"
              name="search"
              id="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 fas fa-search hover:text-gray-800"></i>
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-800 transition duration-200 ease-in-out focus:outline-none"
              onClick={clearInput}
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
      </div>
      <ul className="flex items-center justify-center space-x-6">
        <li className="font-semibold text-gray-700 hover:underline cursor-pointer" onClick={() => navigate({ pathname: '/auth' })}>Login/Sign Up</li>
        <li className="font-semibold text-gray-700">
          <Mode />
        </li>
        <li className="">
          <Menu />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
