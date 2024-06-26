import React from "react";
import { FiX } from "react-icons/fi";
import { LoginForm, Logo } from "./index.js";
import { useDispatch } from "react-redux";

const LoginPopup = ({ onClose, loginTo }) => {
  const dispatch = useDispatch();
  const onLogin = (session) => {
    dispatch(setUser(session));
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
      <div className="bg-gray-900 border border-purple-700 rounded-lg p-8 text-white w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-3 bg-gray-800 text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700 transition-colors"
          aria-label="Close"
        >
          <FiX size={20} />
        </button>

        <div className="flex flex-col gap-4 items-center mb-6">
          <Logo className="text-3xl font-bold text-purple-500" />
          <h2 className="text-xl  font-semibold">
            Login to {loginTo || "Continue"}
          </h2>
        </div>

        <LoginForm onLogin={onLogin} />

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <a href="/signup" className="text-purple-400 hover:text-purple-300">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
