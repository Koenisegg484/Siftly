import React, { useState } from "react";
import LoginForm from "../components/forms/LoginForm";
import SignUpForm from "../components/forms/SignUpForm";

const Auth: React.FC = () => {

    const [isSignupVisible, setSignupVisible] = useState(false);
  
    const toggleSignup = () => {
      setSignupVisible((prev) => !prev);
    };
  
  return (
    <>
       <div className="flex justify-center items-center h-screen">
      {isSignupVisible ? (
        <SignUpForm onShowSignup={toggleSignup} />
      ) : (
        <LoginForm onShowSignup={toggleSignup} />
      )}
    </div>
    </>
  );
};

export default Auth;
