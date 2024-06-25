import React, { useState, useEffect, useRef } from "react";
import { timeAgo } from "../../assets/timeAgo";
import Like from "./Like";
import { useDeleteComment, useEditComment } from "../../hooks/comment.hook";
import { useSelector } from "react-redux";
import DropDown from "../DropDown";
import { Link } from "react-router-dom";

function Comment({ comment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment?.content);
  const userId = useSelector((state) => state.auth.user?._id);

  const isOwner = comment?.owner?._id === userId ? true : false;

  const { mutateAsync: editComment } = useEditComment();
  const { mutateAsync: deleteComment } = useDeleteComment();

  const handleCommentChange = (e) => {
    setEditedComment(e.target.value);
  };

  const handleEditComment = async () => {
    if (editedComment.trim() === comment?.content.trim()) {
      setIsEditing(false);
      return;
    }
    const data = await editComment({
      commentId: comment._id,
      comment: editedComment,
    });
    if (data) {
      setIsEditing(false);
    }
  };

  const handleDeleteComment = async () => {
    const data = await deleteComment(comment?._id);
    if (data) setIsMenuOpen(false);
  };

  return (
    <>
      <div className="flex justify-between gap-x-4">
        <div className="flex gap-x-4">
          <Link to={`/channel/${comment && comment?.owner?.username}`}>
            <div className="mt-2 h-11 w-11 shrink-0">
              <img
                src={comment && comment?.owner?.avatar?.url}
                alt={comment && comment?.owner?.username}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </Link>
          <div className="block">
            <p className="flex items-center text-gray-200">
              {comment && comment?.owner?.fullName}  ·  {"  "}
              <span className="text-sm">
                {comment && timeAgo(comment?.createdAt)}
              </span>
            </p>
            <p className="text-sm text-gray-200">
              @{comment && comment?.owner?.username}
            </p>

            {isEditing ? (
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  className="w-full mt-3 p-2 text-gray-200 bg-gray-800 border border-gray-800 rounded-md dark:border-gray-700  focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none"
                  value={editedComment}
                  onChange={handleCommentChange}
                />
                <button
                  onClick={() => setIsEditing(false)}
                  className="mt-3 px-4 py-2 text-sm text-white bg-blue-500 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleEditComment()}
                  className="mt-3 px-4 py-2 text-sm text-white bg-blue-500 rounded-md"
                >
                  Save
                </button>
              </div>
            ) : (
              <p className="mt-3 text-sm">{comment && comment?.content}</p>
            )}
          </div>
        </div>
        <div className="flex relative flex-col justify-between items-center h-full gap-5">
          {isOwner && (
            <DropDown
              handleDelete={handleDeleteComment}
              handleEdit={() => setIsEditing(true)}
            />
          )}

          <div className="ml-8">
            <Like
              className="px-2"
              iconSize={"w-4"}
              id={comment && comment?._id}
              type={"comments"}
              isLiked={comment && comment?.isLiked}
              likesCount={comment && comment?.likesCount}
            />
          </div>
        </div>
      </div>
      <hr className="my-4 border-white" />
    </>
  );
}

export default Comment;
