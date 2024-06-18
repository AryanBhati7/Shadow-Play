import { useMutation } from "@tanstack/react-query";
import { toggleCommentLike, toggleVideoLike } from "../api/like.api";

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
