import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { coverImg_upOptions, avatar_upOptions } from "../constants.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation - not empty
  // NOTE: check if username or email already exist
  //check for images and avatar
  //upload them to cloudinary, avatar
  //create user object - create entry in DB
  //remove password and refresh token from field
  //check for user creation
  //return res

  const { fullName, email, username, password } = req.body;

  if (
    [fullName, email, username, password].some(
      (field) => field === undefined || field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) throw new ApiError(409, "Email or Username already exists");
  const avatarLocalPath = req.files?.avatar[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) throw new ApiError(400, "Avatar is required");

  const avatar = await uploadOnCloudinary(avatarLocalPath, avatar_upOptions);
  const coverImage = await uploadOnCloudinary(
    coverImageLocalPath,
    coverImg_upOptions
  );

  if (!avatar) throw new ApiError(400, "Avatar uploading failed");

  const user = await User.create({
    fullName,
    avatar: {
      fileId: avatar.public_id,
      url: avatar.url,
    },
    coverImage: {
      fileId: coverImage?.public_id || "",
      url: coverImage?.url || "",
    },
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) throw new ApiError(500, "Account creation failed");

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  if (!usernameOrEmail)
    throw new ApiError(400, "Username or email is required");

  const user = await User.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });

  if (!user) throw new ApiError(404, "User does not exist");

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) throw new ApiError(401, "Invalid User credentials");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  res.setHeader(
    "Set-Cookie",
    `accessToken=${accessToken}; Max-Age=${1 * 24 * 60 * 60 * 1000}; Path=/;  HttpOnly; Secure; SameSite=None; Secure; Partitioned`
  );
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: loggedInUser,
        accessToken,
        refreshToken,
      },
      "User logged in Successfully"
    )
  );
});

const logoutUser = asyncHandler(async (req, res) => {
  //findUser from req.user which comes from middleware
  //delete cookies
  //remove access token and refresh token

  const userId = req.user._id;

  await User.findByIdAndUpdate(
    userId,
    {
      $unset: { refreshToken: 1 }, //removes the field form document
    },
    {
      new: true,
    }
  );
  res.setHeader(
    "Set-Cookie",
    `accessToken=; Max-Age=-1; Path=/; HttpOnly; SameSite=None; Secure; Partitioned`
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) throw new ApiError(401, "Unauthorized Request");

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) throw new ApiError(401, "Invalid refresh Token");

    if (incomingRefreshToken !== user?.refreshAccessToken) {
      throw new ApiError(401, "Refresh token is Expired or used");
    }

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    res.setHeader(
      "Set-Cookie",
      `accessToken=${accessToken}; Max-Age=${1 * 24 * 60 * 60 * 1000}; Path=/;  HttpOnly; Secure; SameSite=None; Secure; Partitioned`
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: req.user },
        "Current User fetched successfully"
      )
    );
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Wrong Current password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Password changed successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  if (!(fullName || email)) {
    throw new ApiError(400, "All fields are required");
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          fullName,
          email,
        },
      },
      {
        new: true,
      }
    ).select("-password -refreshToken");

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Account details updated successfully"));
  } catch (error) {
    throw new ApiError(501, error?.message || "Account Updation failed");
  }
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) throw new ApiError(400, "Avatar file is missing");

  try {
    const avatar = await uploadOnCloudinary(avatarLocalPath, avatar_upOptions);

    if (!avatar.url) throw new ApiError(501, "Error while uploading Avatar");

    await deleteFromCloudinary(req.user?.avatar.fileId);

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          avatar: {
            fileId: avatar.public_id,
            url: avatar.url,
          },
        },
      },
      {
        new: true,
      }
    ).select("-password -refreshToken");

    return res
      .status(200)
      .json(new ApiResponse(200, user, "User Avatar succesfully updated"));
  } catch (error) {
    throw new ApiError(501, error?.message || "Updating User Avatar failed");
  }
});

const updateUserCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.file?.path;

  if (!coverImageLocalPath)
    throw new ApiError(400, "Cover Image file is missing");

  try {
    const coverImage = await uploadOnCloudinary(
      coverImageLocalPath,
      coverImg_upOptions
    );
    if (!coverImage.url)
      throw new ApiError(501, "Error while uploading Cover Image");

    await deleteFromCloudinary(req.user?.coverImage.fileId);
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          coverImage: {
            fileId: coverImage.public_id,
            url: coverImage.url,
          },
        },
      },
      {
        new: true,
      }
    ).select("-password -refreshToken");

    return res
      .status(200)
      .json(new ApiResponse(200, user, "User Cover Image succesfully updated"));
  } catch (error) {
    throw new ApiError(
      501,
      error?.message || "Updating UserCover Image failed"
    );
  }
});

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username?.trim()) throw new ApiError(400, "Username is missing");

  try {
    const channel = await User.aggregate([
      {
        $match: {
          username: username?.toLowerCase(),
        },
      },
      {
        $lookup: {
          from: "subscriptions",
          localField: "_id",
          foreignField: "channel",
          as: "subscribers",
        },
      },
      {
        $lookup: {
          from: "subscriptions",
          localField: "_id",
          foreignField: "subscriber",
          as: "subscribedTo",
        },
      },
      {
        $addFields: {
          subscribersCount: {
            $size: "$subscribers",
          },
          subscribedToCount: {
            $size: "$subscribedTo",
          },
          isSubscribed: {
            $cond: {
              if: { $in: [req.user?._id, "$subscribers.subscriber"] },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $project: {
          fullName: 1,
          username: 1,
          email: 1,
          avatar: 1,
          coverImage: 1,
          subscribersCount: 1,
          subscribedToCount: 1,
          isSubscribed: 1,
          createdAt: 1,
          description: 1,
        },
      },
    ]);
    if (!channel?.length) throw new ApiError(404, "Channel deos not exist");

    return res
      .status(200)
      .json(
        new ApiResponse(200, channel[0], "User channel fetched successfully")
      );
  } catch (error) {
    throw new ApiError(501, error?.message || "User Channel fetching failed");
  }
});

const getWatchHistory = asyncHandler(async (req, res) => {
  try {
    const watchHistory = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $unwind: "$watchHistory",
      },
      {
        $sort: {
          "watchHistory.watchedAt": -1,
        },
      },
      {
        $lookup: {
          from: "videos",
          localField: "watchHistory.video",
          foreignField: "_id",
          as: "video",
        },
      },
      {
        $unwind: "$video",
      },
      {
        $lookup: {
          from: "users",
          localField: "video.owner",
          foreignField: "_id",
          as: "ownerDetails",
          pipeline: [
            {
              $project: {
                username: 1,
                fullName: 1,
                avatar: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          "video.ownerDetails": {
            $first: "$ownerDetails",
          },
          "video.watchedAt": "$watchHistory.watchedAt",
        },
      },
      {
        $project: {
          _id: 0,
          video: 1,
        },
      },
    ]);

    return res
      .status(200)
      .json(
        new ApiResponse(200, watchHistory, "Watch history fetched successfully")
      );
  } catch (error) {
    throw new ApiError(501, "Fetching watch history failed");
  }
});

const updateChannelInfo = asyncHandler(async (req, res) => {
  const { username, description } = req.body;

  if (!(username || description)) {
    throw new ApiError(400, "All fields are required");
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          username,
          description,
        },
      },
      {
        new: true,
      }
    ).select("-password -refreshToken");

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Channel info updated successfully"));
  } catch (error) {
    throw new ApiError(501, "Updating channel info failed");
  }
});

const clearWatchHistory = asyncHandler(async (req, res) => {
  const isCleared = await User.findByIdAndUpdate(
    new mongoose.Types.ObjectId(req.user?._id),
    {
      $set: {
        watchHistory: [],
      },
    },
    {
      new: true,
    }
  );
  if (!isCleared) throw new ApiError(500, "Failed to clear history");
  return res
    .status(200)
    .json(new ApiResponse(200, [], "History Cleared Successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getWatchHistory,
  updateChannelInfo,
  clearWatchHistory,
};
