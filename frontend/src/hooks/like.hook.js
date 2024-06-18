import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  toggleCommentLike,
  toggleVideoLike,
  getLikedVideos,
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
};

export const useLikedVideos = () => {
  return useQuery({
    queryKey: ["likedVideos"],
    queryFn: () => getLikedVideos(),
  });
};
