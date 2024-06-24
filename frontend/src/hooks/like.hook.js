import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  toggleCommentLike,
  toggleVideoLike,
  getLikedVideos,
  toggleTweetLike,
} from "../api/like.api";

export const useLike = (type) => {
  if (type === "video") {
    return useMutation({
      mutationFn: (videoId) => toggleVideoLike(videoId),
    });
  }

  if (type === "comment") {
    return useMutation({
      mutationFn: (commentId) => toggleCommentLike(commentId),
    });
  }
  if (type === "tweet") {
    return useMutation({
      mutationFn: (tweetId) => toggleTweetLike(tweetId),
    });
  }
};

export const useLikedVideos = () => {
  return useQuery({
    queryKey: ["likedVideos"],
    queryFn: () => getLikedVideos(),
  });
};
