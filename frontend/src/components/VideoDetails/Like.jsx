import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { useLike } from "../../hooks/like.hook";
import { useSelector } from "react-redux";
import LoginPopup from "../LoginPopup";
import AuthLayout from "../AuthLayout";

function Like({ id, isLiked, likesCount, type, className, iconSize }) {
  const authStatus = useSelector((state) => state.auth.authStatus);
  const [isLikedState, setIsLikedState] = useState(false);
  const [likesCountState, setLikesCountState] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    setIsLikedState(isLiked);
    setLikesCountState(likesCount);
  }, []);

  let like;
  if (type === "comments") {
    ({ mutateAsync: like } = useLike("comment"));
  } else if (type === "videos") {
    ({ mutateAsync: like } = useLike("video"));
  } else {
    ({ mutateAsync: like } = useLike("tweet"));
  }

  const handleLike = async () => {
    if (!authStatus) {
      return setShowLoginPopup(true);
    }

    const res = await like(id);
    if (res) {
      setIsLikedState(!isLikedState);
      setLikesCountState(
        isLikedState ? likesCountState - 1 : likesCountState + 1
      );
    }
  };

  if (showLoginPopup)
    return (
      <LoginPopup
        loginTo={`Like ${type}`}
        onClose={() => setShowLoginPopup(false)}
      />
    );

  return (
    <div className={`flex justify-center items-center rounded-lg border`}>
      <IconContext.Provider value={{ className: `${iconSize}` }}>
        <button
          onClick={handleLike}
          className={`${className} w-full justify-center   flex items-center gap-x-1 py-1.5 hover:bg-white/10`}
        >
          <span className="inline-block">
            {isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
          </span>
          <span className="text-md text-gray-400">{likesCountState}</span>
        </button>
      </IconContext.Provider>
    </div>
  );
}

export default Like;
