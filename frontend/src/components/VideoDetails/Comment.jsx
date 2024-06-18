import React from "react";
import { timeAgo } from "../../assets/timeAgo";
import Like from "./Like";

function Comment({ comment }) {
  return (
    <>
      <div className="flex justify-between gap-x-4">
        <div className="flex gap-x-4">
          <div className="mt-2 h-11 w-11 shrink-0">
            <img
              src={comment && comment?.owner?.avatar?.url}
              alt={comment && comment?.owner?.username}
              className="h-full w-full rounded-full"
            />
          </div>
          <div className="block">
            <p className="flex items-center text-gray-200">
              {comment && comment?.owner?.fullName} · 
              <span className="text-sm">
                {comment && timeAgo(comment?.createdAt)}
              </span>
            </p>
            <p className="text-sm text-gray-200">
              @{comment && comment?.owner?.username}
            </p>
            <p className="mt-3 text-sm">{comment && comment?.content}</p>
          </div>
        </div>
        <Like
          id={comment && comment?._id}
          type={"comments"}
          isLiked={comment && comment?.isLiked}
          likesCount={comment && comment?.likesCount}
        />
      </div>
      <hr className="my-4 border-white" />
    </>
  );
}

export default Comment;
