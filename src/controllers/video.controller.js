import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { video_upOptions, thumbnail_upOptions } from "../constants.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination
});

const publishAVideo = asyncHandler(async (req, res) => {
  // TODO: get video, upload to cloudinary, create video
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
    title: req.body.title,
    description: req.body.description,
    isPublished: req.body.isPublished,
    owner: req.user._id,
  });

  if (!video) throw new ApiError(500, "Failed to publish video");

  return res
    .status(201)
    .json(new ApiResponse(201, video, "Video published successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
