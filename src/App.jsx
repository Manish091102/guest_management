import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import OtpVerification from "./components/OtpVerification";
import { registerVerify } from "./features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Handle form submission (Register/Login)
  const handleFormSubmit = (message, success, email = "") => {
    toast[success ? "success" : "error"](message, {
      position: "top-right",
      duration: 3000,
    });

    // If OTP is successfully sent, show OTP screen
    if (success && email) {
      setUserEmail(email);
      setShowOtpScreen(true);
    }
  };

  const handleOtpSubmit = (otp) => {
    const userData = {
      email: userEmail,
      otp,
    };
  
    dispatch(registerVerify(userData))
      .unwrap()
      .then((data) => {
        console.log("OTP verified successfully!");
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("OTP verification failed", error);
      });
  };

  return (
    <div className="app">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="header">
        <button onClick={() => { setIsLogin(false); setShowOtpScreen(false); }} className={!isLogin ? "active" : ""}>
          Register
        </button>
        <button onClick={() => { setIsLogin(true); setShowOtpScreen(false); }} className={isLogin ? "active" : ""}>
          Login
        </button>
      </div>

      <div className="">
        {showOtpScreen ? (
          <OtpVerification email={userEmail} onSubmit={handleOtpSubmit} />
        ) : isLogin ? (
          <LoginForm onSubmit={handleFormSubmit} />
        ) : (
          <RegisterForm onSubmit={handleFormSubmit} />
        )}
      </div>
    </div>
  );
};

export default App;


