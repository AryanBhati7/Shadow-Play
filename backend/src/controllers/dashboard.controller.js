import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Tweet } from "../models/tweet.model.js";

const getChannelStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const totalSubscribers = await Subscription.aggregate([
    {
      $match: {
        channel: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $group: {
        _id: null,
        subscribersCount: {
          $sum: 1,
        },
      },
    },
  ]);
  if (!totalSubscribers)
    throw new ApiError(501, "Failed to fetch Total subscribers");

  const videoStats = await Video.aggregate([
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
      $project: {
        totalLikes: {
          $size: "$likes",
        },
        totalViews: "$views",
        totalVideos: 1,
      },
    },
    {
      $group: {
        _id: null,
        totalLikes: {
          $sum: "$totalLikes",
        },
        totalViews: {
          $sum: "$totalViews",
        },
        totalVideos: {
          $sum: 1,
        },
      },
    },
  ]);
  if (!videoStats) throw new ApiError(501, "Failed to fetch Video Stats");

  const channelStats = {
    totalSubscribers: totalSubscribers[0]?.subscribersCount || 0,
    totalLikes: videoStats[0]?.totalLikes || 0,
    totalViews: videoStats[0]?.totalViews || 0,
    totalVideos: videoStats[0]?.totalVideos || 0,
  };

  return res
    .status(200)
    .json(
      new ApiResponse(200, channelStats, "Channel Stats fetched successfully")
    );
});

const getChannelVideos = asyncHandler(async (req, res) => {
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

const getChannelAbouts = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const channelAbouts = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "videos",
          localField: "_id",
          foreignField: "owner",
          as: "videos",
        },
      },
      {
        $lookup: {
          from: "tweets",
          localField: "_id",
          foreignField: "owner",
          as: "tweets",
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "videos._id",
          foreignField: "video",
          as: "videoLikes",
        },
      },
      {
        $project: {
          username: 1,
          fullName: 1,
          email: 1,
          description: 1,
          createdAt: 1,
          totalVideos: { $size: "$videos" },
          totalTweets: { $size: "$tweets" },
          totalLikes: { $size: "$videoLikes" },
          totalViews: { $sum: "$videos.views" },
        },
      },
    ]);

    if (!channelAbouts || channelAbouts.length === 0) {
      throw new ApiError(404, "Channel information not found");
    }

    const channelInfo = channelAbouts[0];

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          channelInfo,
          "Channel information fetched successfully"
        )
      );
  } catch (error) {
    console.error("Error in getChannelAbouts:", error);
    throw new ApiError(500, "Error fetching channel information", error);
  }
});

export { getChannelStats, getChannelVideos, getChannelAbouts };
