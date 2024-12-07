import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext"; // Adjust the import path as needed

// Define TypeScript interfaces for better type safety
interface SignUpFormProps {
  onShowSignup: () => void;
}

interface ValidationErrors {
  email: string;
  password: string[];
}

interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onShowSignup }) => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({
    email: "",
    password: [],
  });
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login method from AuthContext

  // Toast Configuration
  const toastConfig: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {
      fontSize: "14px",
      maxWidth: "350px",
      padding: "10px",
    },
  };

  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePassword = (password: string): string[] => {
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

    if (!emailError && passwordErrors.length === 0) {
      try {
        const payload: SignUpPayload = {
          name,
          email,
          password,
        };

        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          payload
        );

        // Extract token from response
        const token = response.data.token;

        // Use the login method from AuthContext
        login(token);

        toast.success("Sign up successful!", toastConfig);
        
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          const errorMessage =
            axiosError.response?.data?.message || axiosError.message;
          toast.error(errorMessage, toastConfig);
        } else {
          toast.error("An unexpected error occurred", toastConfig);
        }
      }
    }
  };

  return (
    <div className="relative py-3 w-1/3 sm:max-w-xl sm:mx-auto shadow-2xl rounded-3xl">
            <ToastContainer />
      <div className="relative px-4 py-5 bg-white mx-4 md:mx-0 sm:p-10">
        <form onSubmit={handleSubmit}>
          <div className="max-w-md mx-auto">
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-1">
              <div className="flex flex-col">
                <label>Full Name</label>
                <div className="flex flex-col">
                  <div className="flex items-center border rounded-lg p-2">
                    <i className="fa-solid fa-user fa-lg pe-2"></i>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="flex-grow outline-none bg-transparent"
                      placeholder="Enter your Full Name"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <label>Email</label>
                <div className="flex flex-col">
                  <div className="flex items-center border rounded-lg p-2">
                    <i className="fa-solid fa-at fa-lg pe-2"></i>
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
                    <i className="fa-solid fa-lock fa-lg pe-2"></i>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex-grow outline-none bg-transparent"
                      placeholder="Enter your Password"
                    />
                    <i
                      className={` right-3 top-4 cursor-pointer ${
                        passwordVisible
                          ? "fa-solid fa-eye-slash"
                          : "fa-solid fa-eye"
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
            </div>

            <div className="mt-5">
              <button
                className="py-2 px-2 bg-blue-600 hover:bg-blue-700 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg"
                type="submit"
              >
                Sign Up
              </button>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
              <p className="text-center">
                Have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={onShowSignup}
                >
                  Log in
                </span>
              </p>
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
            </div>
          </div>
          <p className="text-center my-4">Or With</p>

          <div className="flex justify-center gap-4">
            <button className="flex items-center bg-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300">
              <i className="fa-brands fa-google fa-xl p-2"></i>
              Google
            </button>

            <button className="flex items-center justify-between bg-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300">
              <i className="fa-brands fa-twitter fa-2xl p-2"></i>
              Twitter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
