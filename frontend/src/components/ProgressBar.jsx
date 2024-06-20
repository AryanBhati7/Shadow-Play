import React from "react";

const ProgressBar = () => {
  return (
    <div className="relative w-full h-2 bg-gray-200 overflow-hidden">
      <div
        className="absolute h-2 bg-purple-500 w-1/4 animate-slide"
        style={{
          animationDuration: "2s",
          animationIterationCount: "infinite",
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
