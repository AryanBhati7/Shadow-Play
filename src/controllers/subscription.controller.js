import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const userId = req.user._id;

  if (userId.toHexString() === channelId) {
    throw new ApiError(401, "Self-Subscription is prohibited");
  }

  let isSubscribed = await Subscription.findOne({
    channel: channelId,
    subscriber: userId,
  });

  if (isSubscribed) {
    await Subscription.findByIdAndDelete(isSubscribed?._id);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Channel Unsubscribed"));
  } else {
    await Subscription.create({
      channel: channelId,
      subscriber: userId,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Channel Subscribed"));
  }
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  const channelSubscribers = await Subscription.aggregate([
    {
      $match: {
        channel: channelId,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "subscriber",
        pipeline: [
          {
            $lookup: {
              from: "subscriptions",
              localField: "_id",
              foreignField: "channel",
              as: "subscribedToSubscriber",
            },
          },
          {
            $addFields: {
              subscribedToSubscriber: {
                $cond: {
                  if: {
                    $in: [channelId, "$subscribedToSubscriber.subscriber"],
                  },
                  then: true,
                  else: false,
                },
              },
              subscribersCount: {
                $size: "$subscribedToSubscriber",
              },
            },
          },
        ],
      },
    },
    {
      $unwind: "$subscriber",
    },
    {
      $project: {
        _id: 0,
        subscriber: {
          _id: 1,
          username: 1,
          fullName: 1,
          "avatar.url": 1,
          subscribedToSubscriber: 1,
          subscribersCount: 1,
        },
      },
    },
  ]);

  if (!channelSubscribers)
    throw new ApiError(500, "Fetching User Channel Subscribers failed");
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        channelSubscribers,
        "User Channel Subscribers fetched Successfully"
      )
    );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
