import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { video_upOptions, thumbnail_upOptions } from "../constants.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;

  const pipeline = [];

  if (query) {
    pipeline.push({
      $search: {
        index: "search-videos",
        text: {
          query: query,
          path: ["title", "description"],
        },
      },
    });
  }
  if (userId) {
    if (!isValidObjectId(userId)) {
      throw new ApiError(400, "Invalid userId");
    }

    pipeline.push({
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    });
  }
  // fetch videos only that are set isPublished as true
  pipeline.push({ $match: { isPublished: true } });

  //sortBy can be views, createdAt, duration
  //sortType can be ascending(-1) or descending(1)
  if (sortBy && sortType) {
    pipeline.push({
      $sort: {
        [sortBy]: sortType === "asc" ? 1 : -1,
      },
    });
  } else {
    pipeline.push({ $sort: { createdAt: -1 } });
  }

  pipeline.push(
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerDetails",
        pipeline: [
          {
            $project: {
              username: 1,
              "avatar.url": 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$ownerDetails",
    }
  );

  const videoAggregate = Video.aggregate(pipeline);

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };

  const video = await Video.aggregatePaginate(videoAggregate, options);

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Videos fetched successfully"));
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description, isPublished } = req.body;

  if ([title, description, isPublished].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const videoLocalPath = req.files?.video[0]?.path;

  if (!videoLocalPath) throw new ApiError(401, "Video is required to publish");

  const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

  if (!thumbnailLocalPath)
    throw new ApiError(401, "Thumbnail is required to publish");

  const videoFile = await uploadOnCloudinary(videoLocalPath, video_upOptions);

  if (!videoFile) throw new ApiError(500, "Failed to upload video");

  const thumbnailFile = await uploadOnCloudinary(
    thumbnailLocalPath,
    thumbnail_upOptions
  );

  if (!thumbnailFile) throw new ApiError(500, "Failed to upload thumbnail");

  const video = await Video.create({
    video: {
      fileId: videoFile.public_id,
      url: videoFile.playback_url,
    },
    thumbnail: {
      fileId: thumbnailFile.public_id,
      url: thumbnailFile.url,
    },
    duration: videoFile.duration,
    title,
    description,
    isPublished,
    owner: req.user._id,
  });

  if (!video) throw new ApiError(500, "Failed to publish video");

  return res
    .status(201)
    .json(new ApiResponse(201, video, "Video published successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId?.trim()) throw new ApiError(400, "Video Id is missing");

  if (!isValidObjectId(videoId)) throw new ApiError(400, "Invalid VideoID");
  const video = await Video.findById(videoId);

  if (!video) throw new ApiError(404, "Video not found");

  return res.status(200).json(new ApiResponse(200, video, "Video found"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  const { title, description } = req.body;
  const thumbnailLocalPath = req.file?.path;

  if ([title, description].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  if (!currentVideo) throw new ApiError(401, "Video cannot be found");

  let update = {
    $set: {
      title,
      description,
    },
  };

  // If a new thumbnail was provided, add it to the update object
  if (thumbnailLocalPath) {
    const thumbnailFile = await uploadOnCloudinary(
      thumbnailLocalPath,
      thumbnail_upOptions
    );

    if (!thumbnailFile) throw new ApiError(501, "Thumbnail uploading failed");

    await deleteFromCloudinary(currentVideo?.thumbnail.fileId);

    update.$set.thumbnail = {
      fileId: thumbnailFile.public_id,
      url: thumbnailFile.url,
    };
  }

  const video = await Video.findByIdAndUpdate(videoId, update, {
    new: true,
  });

  if (!video) throw new ApiError(501, "Updating Video failed");

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video updated successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const currentVideo = await Video.findById(videoId);

  if (!currentVideo) throw new ApiError(404, "Video not found");

  const deleteVideo = await Video.findByIdAndDelete(videoId);

  if (!deleteVideo) throw new ApiError(500, "Video deletion failed");

  //after deleting the video start the process of deleting the thumbnail
  await deleteFromCloudinary(currentVideo?.thumbnail.fileId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Video deleted Successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const video = await Video.findById(videoId);

  if (!video) throw new ApiError(404, "Video not found");

  video.isPublished = !video.isPublished;

  await video.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video publish status updated"));
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
