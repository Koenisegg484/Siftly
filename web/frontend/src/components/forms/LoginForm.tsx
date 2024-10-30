import React from "react";

const LoginForm: React.FC<{ onShowSignup: () => void }> = ({
  onShowSignup,
}) => {
  return (
    <div className="rounded-xl shadow-2xl mb-8 w-1/3">
      <form className="flex flex-col gap-4 p-6 pt-8">
        <div className="flex flex-col">
          <label>Email</label>
          <div className="flex items-center border rounded-lg p-2">
            <i className="fa-solid fa-at fa-lg"></i>{" "}
            <input
              type="text"
              className="flex-grow outline-none bg-transparent"
              placeholder="Enter your Email"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label>Password</label>
          <div className="flex items-center border rounded-lg p-2">
            <i className="fa-solid fa-lock fa-lg"></i>{" "}
            <input
              type="password"
              className="flex-grow outline-none bg-transparent"
              placeholder="Enter your Password"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input type="checkbox" />
            <label className="ml-2">Remember me</label>
          </div>
          <span className="text-blue-500 cursor-pointer">Forgot password?</span>
        </div>

        <button className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Sign In
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
  );
};

export default LoginForm;
