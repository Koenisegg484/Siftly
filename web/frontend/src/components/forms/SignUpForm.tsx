import React from "react";

const SignUpForm: React.FC<{ onShowSignup: () => void }> = ({
  onShowSignup,
}) => {
  return (
    <div className="relative py-3 w-1/3 sm:max-w-xl sm:mx-auto shadow-2xl rounded-3xl">
      <div className="relative px-4 py-5 bg-white mx-4 md:mx-0 sm:p-10">
        <div className="max-w-md mx-auto">
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-1">
            <div>
              <label
                className="font-semibold text-sm text-gray-600 pb-1 block"
                htmlFor="fullname"
              >
                Full Name
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                type="text"
                id="fullname"
              />
            </div>
            <div>
              <label
                className="font-semibold text-sm text-gray-600 pb-1 block"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                type="email"
                id="email"
              />
            </div>
            <div>
              <label
                className="font-semibold text-sm text-gray-600 pb-1 block"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                type="text"
                id="username"
              />
            </div>
            <div>
              <label
                className="font-semibold text-sm text-gray-600 pb-1 block"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                type="password"
                id="password"
              />
            </div>
          </div>
          <p className="text-center my-2">Or With</p>
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
          <div className="mt-5">
            <button
              className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              type="submit"
            >
              Sign up
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
      </div>
    </div>
  );
};

export default SignUpForm;
