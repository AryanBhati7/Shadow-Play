import React, { useState } from "react";
import AllNextVideos from "./AllNextVideos";
import UserNextVideos from "./UserNextVideos";

function NextVideosColumn({ videoId, name, userId }) {
  const [nextVideosOption, setNextVideosOption] = useState("all");
  return (
    <>
      <div className="flex gap-3">
        <button
          onClick={() => setNextVideosOption("all")}
          className={`
          ${nextVideosOption === "all" && "bg-gray-500 text-white"}
            bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        >
          All
        </button>
        <button
          onClick={() => setNextVideosOption("user")}
          className={`
            ${nextVideosOption === "user" && "bg-gray-500 text-white"}
            bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        >
          From {name}
        </button>
      </div>

      {nextVideosOption === "all" ? (
        <AllNextVideos currentVideoId={videoId} />
      ) : (
        <UserNextVideos userId={userId} />
      )}
    </>
  );
}

export default NextVideosColumn;
