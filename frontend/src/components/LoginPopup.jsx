import React from "react";
import { Link } from "react-router-dom";
import { Button, Logo } from "./index.js";

const LoginPopup = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
      <div className="bg-black border border-slate-800 rounded-lg p-5 text-white text-center">
        <div className="flex flex-col gap-2 items-center mb-2">
          <Logo />
        </div>
        <p className="text-xl font-medium mb-2">Login or Signup to continue</p>
        <Link to="/login">
          <Button className="bg-purple-500 text-color w-full py-2 px-4 font-bold text-lg rounded">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPopup;
