import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const video = await Video.findById(videoId);

  if (!video) throw new ApiError(404, "Video not found");

  const comments = await Comment.find({ video: videoId })
    .populate("owner", "username")
    .skip((page - 1) * limit)
    .limit(limit);

  console.log(comments);

  return res.status(200).json(
    new ApiResponse(200, {
      comments,
      total: comments.length,
      page: parseInt(page),
      limit: parseInt(limit),
    })
  );
});

const addComment = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { content } = req.body;

  if (!content) throw new ApiError(404, "Comment content is required");
  const video = await Video.findById(videoId);

  if (!video) throw new ApiError(404, "Video not found");
  const comment = await Comment.create({
    video: videoId,
    content,
    owner: req.user._id,
  });

  if (!comment) throw new ApiError(500, "Error adding comment");

  return res.status(200).json(new ApiResponse(200, content, "Comment added"));
});

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  if (!content) throw new ApiError(404, "Comment content is required");

  const comment = await Comment.findByIdAndUpdate(
    commentId,
    { content },
    { new: true }
  );
  if (!comment) throw new ApiError(500, "Error updating comment");

  return res.status(200).json(new ApiResponse(200, comment, "Comment updated"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findByIdAndDelete(commentId);

  if (!comment) throw new ApiError(404, "Comment not found");

  return res.status(200).json(new ApiResponse(200, null, "Comment deleted"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
