import React, { useState } from "react";
import Mode from "./Mode";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../utils/AuthContext";

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearInput = () => {
    setSearchTerm("");
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/ecommstores/web-scrapper/${searchTerm}`
      );
      setProducts(response.data);

      navigate("/search", { state: { products: response.data } });
    } catch (err) {
      console.error("Search error:", err);

      const errorMessage =
        axios.isAxiosError(err) && err.response
          ? `Server Error: ${err.response.status}`
          : "An error occurred during search";

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
      navigate("/auth/");
    } else {
      navigate("/auth");
    }
  };

  return (
    <>
      {/* Full-screen loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="animate-spin text-white text-4xl">
            <i className="fas fa-spinner"></i>
          </div>
        </div>
      )}

      <nav className="flex justify-between items-center bg-white dark:bg-gray-800 transition-colors duration-300 px-8 py-3 shadow-md">
        <h1
          className="text-xl text-gray-800 font-semibold cursor-pointer dark:text-white"
          onClick={() => navigate({ pathname: "/" })}
        >
          Siftly
        </h1>

        <form
          onSubmit={handleSearch}
          className="flex items-center flex-grow mx-4"
        >
          <div className="relative w-full max-w-md mx-auto dark:color-white">
            <input
              className="w-full border border-gray-500 rounded-3xl py-2 px-12 focus:outline-none focus:border-blue-500"
              type="text"
              name="search"
              id="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              disabled={isLoading}
            />

            <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 fas fa-search hover:text-gray-800"></i>

            {searchTerm && !isLoading && (
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-800 transition duration-200 ease-in-out focus:outline-none"
                onClick={clearInput}
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            )}
          </div>
        </form>

        {error && (
          <div className="text-red-500 text-sm absolute bottom-0 left-0 right-0 text-center">
            {error}
          </div>
        )}

        <ul className="flex items-center justify-center space-x-6">
          <li
            className="font-semibold text-gray-700 hover:underline cursor-pointer dark:text-white"
            onClick={handleAuthAction}
          >
            {isAuthenticated ? "Logout" : "Login/Sign Up"}
          </li>
          <li className="font-semibold text-gray-700">
            <Mode />
          </li>
          <li className="">
            <Menu />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;