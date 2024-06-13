import React from "react";

function Button({ className, text = "Log in" }) {
  return (
    <button
      className={`w-full bg-[#383737] px-3 py-2 hover:bg-[#4f4e4e] sm:w-auto sm:bg-transparent ${className}`}
    >
      Log in
    </button>
  );
}

export default Button;
