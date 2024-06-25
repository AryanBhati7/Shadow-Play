import React from "react";

function Logo({ className }) {
  return (
    <div
      className={`font-extrabold text-xl w-full ${className} text-purple-500`}
    >
      YT-Tweets
    </div>
  );
}

export default Logo;
