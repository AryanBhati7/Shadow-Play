import React from "react";
import { IconContext } from "react-icons";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useInvalidator, useLike } from "../../hooks/queries";

function Like() {
  const video = useSelector((state) => state.video.video);
  const invalidate = useInvalidator();

  const { mutateAsync: like } = useLike();

  const handleLike = async () => {
    await like(video._id);
    invalidate(["videos", video._id]);
  };
  return (
    <div className="flex  rounded-lg border">
      <IconContext.Provider value={{ className: "w-8" }}>
        <button
          onClick={() => handleLike()}
          className="group/btn flex items-center gap-x-2 border-r border-gray-700 px-4 py-1.5  hover:bg-white/10"
        >
          <span className="inline-block w-5 ">
            {video && video?.isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
          </span>
          <span>
            <span className="text-md text-gray-400">
              {video && video?.likesCount}
            </span>
          </span>
        </button>
      </IconContext.Provider>
    </div>
  );
}

export default Like;
