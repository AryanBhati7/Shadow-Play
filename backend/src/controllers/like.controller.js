import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user._id;

  let likeVideo = await Like.findOne({ video: videoId, likedBy: userId });

  if (likeVideo) {
    await Like.findByIdAndDelete(likeVideo._id);
    return res.status(200).json(new ApiResponse(200, null, "Video unliked"));
  } else {
    likeVideo = await Like.create({ video: videoId, likedBy: userId });
    return res.status(200).json(new ApiResponse(200, null, "Video liked"));
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;

  try {
    let commentLike = await Like.findOne({
      comment: commentId,
      likedBy: userId,
    });

    if (commentLike) {
      await Like.findByIdAndDelete(commentLike._id);
      return res
        .status(200)
        .json(new ApiResponse(200, null, "Comment unliked"));
    } else {
      commentLike = await Like.create({ comment: commentId, likedBy: userId });
      return res.status(200).json(new ApiResponse(200, null, "Comment liked"));
    }
  } catch (error) {
    throw new ApiError(501, error?.message || "ToggleLike comment failed");
  }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  const userId = req.user._id;

  try {
    let tweetLike = await Like.findOne({
      tweet: tweetId,
      likedBy: userId,
    });

    if (tweetLike) {
      await Like.findByIdAndDelete(tweetLike._id);
      return res
        .status(200)
        .json(new ApiResponse(200, null, "Comment unliked"));
    } else {
      tweetLike = await Like.create({ tweet: tweetId, likedBy: userId });
      return res.status(200).json(new ApiResponse(200, null, "Comment liked"));
    }
  } catch (error) {
    throw new ApiError(501, error?.message || "toggleLike tweet failed");
  }
});

const getLikedVideos = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  try {
    const likedVideos = await Like.aggregate([
      {
        $match: {
          likedBy: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "videos",
          localField: "video",
          foreignField: "_id",
          as: "likedVideo",
          pipeline: [
            {
              $match: {
                isPublished: true, // to filter only published videos
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "ownerDetails",
              },
            },
            {
              $unwind: "$ownerDetails",
            },
          ],
        },
      },
      {
        $unwind: "$likedVideo",
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $project: {
          _id: 0,
          likedVideo: {
            _id: 1,
            "video.url": 1,
            "thumbnail.url": 1,
            owner: 1,
            title: 1,
            description: 1,
            views: 1,
            duration: 1,
            createdAt: 1,
            isPublished: 1,
            ownerDetails: {
              username: 1,
              fullName: 1,
              "avatar.url": 1,
            },
          },
        },
      },
    ]);

    if (!likedVideos.length) throw new ApiError(404, "No liked videos found");

    return res
      .status(200)
      .json(
        new ApiResponse(200, likedVideos, "Liked videos fetched successfully")
      );
  } catch (error) {
    throw new ApiError(500, error?.message || "Failed to get liked videos");
  }
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
