import React from "react";
import { IconContext } from "react-icons";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { useInvalidator } from "../../hooks/queryClient.hook";
import { useLike } from "../../hooks/like.hook";

function Like({ id, isLiked, likesCount, type, className, iconSize }) {
  const invalidate = useInvalidator();
  let like;

  if (type === "comments") {
    ({ mutateAsync: like } = useLike("comment"));
  }
  if (type === "videos") {
    ({ mutateAsync: like } = useLike("video"));
  }

  const handleLike = async () => {
    await like(id);
    invalidate([type, id]);
  };

  return (
    <div className={`flex justify-center items-center  rounded-lg border `}>
      <IconContext.Provider value={{ className: ` ${iconSize}` }}>
        <button
          onClick={() => handleLike()}
          className={`${className} w-full flex items-center gap-x-1  py-1.5  hover:bg-white/10`}
        >
          <span className="inline-block">
            {isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
          </span>
          <span>
            <span className="text-md text-gray-400">{likesCount}</span>
          </span>
        </button>
      </IconContext.Provider>
    </div>
  );
}

export default Like;
