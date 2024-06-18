import React, { useState, useEffect, useRef } from "react";
import { timeAgo } from "../../assets/timeAgo";
import Like from "./Like";
import { useDeleteComment, useEditComment } from "../../hooks/comment.hook";
import { useInvalidator } from "../../hooks/queryClient.hook";
import { useSelector } from "react-redux";

function Comment({ comment }) {
  const invalidate = useInvalidator();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment?.content);
  const videoId = useSelector((state) => state.video.video?._id);
  const userId = useSelector((state) => state.auth.user?._id);

  const isOwner = comment?.owner?._id === userId ? true : false;

  const { mutateAsync: editComment } = useEditComment();
  const { mutateAsync: deleteComment } = useDeleteComment();

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
      invalidate("comments", videoId);
      setIsEditing(false);
    }
  };

  const handleDeleteComment = async () => {
    const data = await deleteComment(comment?._id);
    if (data) {
      invalidate("comments", videoId);
      setIsMenuOpen(false);
    }
  };
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          <div className="relative inline-block " ref={dropdownRef}>
            {isOwner && (
              <button
                onClick={() => handleMenu()}
                className="relative z-10 ml-8 block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            )}

            {isMenuOpen && (
              <div className="absolute right-8 top-2 z-20 w-24  mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full h-full block px-4 py-2 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Edit
                </button>
                <hr className="border-gray-200 dark:border-gray-700 " />
                <button
                  onClick={() => handleDeleteComment()}
                  className="w-full h-full block px-4 py-2 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
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
