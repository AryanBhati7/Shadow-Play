import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const video = await Video.findById(videoId);

  if (!video) throw new ApiError(404, "Video not found");

  const commentsAggregate = Comment.aggregate([
    {
      $match: {
        video: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "comment",
        as: "likes",
      },
    },
    {
      $addFields: {
        likesCount: {
          $size: "$likes",
        },
        owner: {
          $first: "$owner",
        },
        isLiked: {
          $cond: {
            if: { $in: [req.user?._id, "$likes.likedBy"] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        content: 1,
        createdAt: 1,
        likesCount: 1,
        owner: {
          username: 1,
          fullName: 1,
          "avatar.url": 1,
        },
        isLiked: 1,
      },
    },
  ]);
  if (!commentsAggregate) {
    throw new ApiError(500, "Error creating comments aggregate");
  }

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };

  const comments = await Comment.aggregatePaginate(commentsAggregate, options);

  if (!comments) throw new ApiError(501, "Comments Pagination failed");

  return res
    .status(200)
    .json(
      new ApiResponse(200, comments, "Video Comments fetched Successfully")
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
