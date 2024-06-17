import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-purple-700 animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-purple-700 animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-purple-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
