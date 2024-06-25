import React from "react";

function Logo({ className }) {
  return (
    <div
      className={`font-bold text-xl w-full ${className} text-[hsl(280,95%,39%)]`}
    >
      YT-Tweets
    </div>
  );
}

export default Logo;
