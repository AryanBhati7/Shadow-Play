import mongoose, { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!isValidObjectId(videoId)) throw new ApiError(401, "Invalid VideoID");

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

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment Id");
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (comment?.owner.toString() !== req.user?._id.toString()) {
    throw new ApiError(400, "only comment owner can edit their comment");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    { $set: { content } },
    { new: true }
  );
  if (!updatedComment) throw new ApiError(500, "Error updating comment");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "Comment updated"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user?._id;

  if (!isValidObjectId(commentId))
    throw new ApiError(401, "Invalid Comment ID");

  const comment = await Comment.findById(commentId);

  if (!comment) throw new ApiError(404, "Comment not found");

  if (comment?.owner.toString() !== userId.toString()) {
    throw new ApiError(400, "only owner can delete their Comment");
  }
  await Comment.findByIdAndDelete(commentId);

  return res.status(200).json(new ApiResponse(200, null, "Comment deleted"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
