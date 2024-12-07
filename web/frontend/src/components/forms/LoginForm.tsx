import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

const LoginForm: React.FC<{ onShowSignup: () => void }> = ({
  onShowSignup,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: [] as string[],
  });
  
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login method from AuthContext

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePassword = (password: string) => {
    const passwordErrors: string[] = [];

    if (!password) {
      passwordErrors.push("Password is required");
    } else {
      if (password.length < 8) {
        passwordErrors.push("At least 8 characters long");
      }
      if (!/[A-Z]/.test(password)) {
        passwordErrors.push("One uppercase letter");
      }
      if (!/[a-z]/.test(password)) {
        passwordErrors.push("One lowercase letter");
      }
      if (!/[0-9]/.test(password)) {
        passwordErrors.push("One number");
      }
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        passwordErrors.push("One special character");
      }
    }

    return passwordErrors;
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordErrors = validatePassword(password);

    setErrors({
      email: emailError,
      password: passwordErrors,
    });

    // If there are validation errors, stop submission
    if (emailError || passwordErrors.length > 0) {
      return;
    }

    setIsLoading(true);

    const axiosInstance = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      // Use the login method from AuthContext
      login(response.data.token);

      toast.success("Login successful! Redirecting...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Redirect 
      setTimeout(() => {
        navigate("/"); // or wherever you want to redirect
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Login failed. Please try again.";

        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error("Network error. Please check your connection.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-xl shadow-2xl mb-8 w-1/3">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 pt-8">
        <div className="flex flex-col">
          <label>Email</label>
          <div className="flex flex-col">
            <div className="flex items-center border rounded-lg p-2">
              <i className="fa-solid fa-at fa-lg pe-2"></i>{" "}
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow outline-none bg-transparent"
                placeholder="Enter your Email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label>Password</label>
          <div className="flex flex-col">
            <div className="flex items-center border rounded-lg p-2">
              <i className="fa-solid fa-lock fa-lg pe-2"></i>{" "}
              <input
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-grow outline-none bg-transparent"
                placeholder="Enter your Password"
              />
              <i
                className={` right-3 top-4 cursor-pointer ${
                  passwordVisible ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
                } text-gray-500`}
                onClick={() => setPasswordVisible(!passwordVisible)}
              ></i>
            </div>
            {errors.password.length > 0 && (
              <div className="text-red-500 text-sm mt-1">
                <p>Password must contain:</p>
                <ul className="list-disc list-inside">
                  {errors.password.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input type="checkbox" />
            <label className="ml-2">Remember me</label>
          </div>
          <span className="text-blue-500 cursor-pointer">Forgot password?</span>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`text-white py-2 rounded-lg ${
            isLoading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/8 border-b dark:border-gray-600 md:w-1/4" />
          <p className="text-center">
            Don't have an account?
            <span
              className="text-blue-500 cursor-pointer"
              onClick={onShowSignup}
            >
              Sign Up
            </span>
          </p>
          <span className="w-1/8 border-b dark:border-gray-600 md:w-1/4" />
        </div>

        <p className="text-center my-4">Or With</p>

        <div className="flex justify-center gap-4">
          <button
            type="button"
            className="flex items-center bg-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300"
          >
            <i className="fa-brands fa-google fa-xl p-2"></i>
            Google
          </button>

          <button
            type="button"
            className="flex items-center justify-between bg-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300"
          >
            <i className="fa-brands fa-twitter fa-2xl p-2"></i>
            Twitter
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
