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
      ${
        nextVideosOption === "all"
          ? "bg-purple-500 text-white"
          : "bg-gray-500 text-gray-200"
      }
      hover:bg-purple-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        >
          All
        </button>
        <button
          onClick={() => setNextVideosOption("user")}
          className={`
      ${
        nextVideosOption === "user"
          ? "bg-purple-500 text-white"
          : "bg-gray-500 text-gray-200"
      }
      hover:bg-purple-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
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
