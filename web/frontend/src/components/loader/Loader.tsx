import React from "react";
import "./loader.css"; // Ensure this path is correct

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="newtons-cradle relative flex items-center justify-center w-20 h-20">
        <div className="newtons-cradle__dot relative flex items-center h-full w-1/4 transform origin-top">
          <div className="dot"></div>
        </div>
        <div className="newtons-cradle__dot relative flex items-center h-full w-1/4 transform origin-top">
          <div className="dot"></div>
        </div>
        <div className="newtons-cradle__dot relative flex items-center h-full w-1/4 transform origin-top">
          <div className="dot"></div>
        </div>
        <div className="newtons-cradle__dot relative flex items-center h-full w-1/4 transform origin-top">
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
