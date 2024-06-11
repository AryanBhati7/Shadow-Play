import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
});

const getChannelVideos = asyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel
  const userId = req.user._id;

  const channelVideos = await Video.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "video",
        as: "likes",
      },
    },
    {
      $addFields: {
        likesCount: {
          $size: "$likes",
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
        _id: 1,
        "video.url": 1,
        "thumbnail.url": 1,
        title: 1,
        description: 1,
        // dateUploaded: {
        //   year: 1,
        //   month: 1,
        //   day: 1,
        // },
        isPublished: 1,
        likesCount: 1,
        createdAt: 1,
      },
    },
  ]);

  if (!channelVideos) throw new ApiError(501, "Failed to fetch Channel Videos");

  return res
    .status(200)
    .json(
      new ApiResponse(200, channelVideos, "Channel Videos fetched Successfully")
    );
});

export { getChannelStats, getChannelVideos };
