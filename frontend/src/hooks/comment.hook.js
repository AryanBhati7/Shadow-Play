import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  addComment,
  deleteComment,
  getAllComments,
  updateComment,
} from "../api/comment.api";

export const useAddComment = () => {
  return useMutation({
    mutationFn: ({ videoId, comment }) =>
      addComment(videoId, { content: comment }),
  });
};
export const useEditComment = () => {
  return useMutation({
    mutationFn: ({ commentId, comment }) =>
      updateComment(commentId, { content: comment }),
  });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
  });
};

export const useComments = (videoId) => {
  return useInfiniteQuery({
    queryKey: ["comments", videoId],
    queryFn: ({ pageParam = 1 }) => getAllComments(videoId, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage === false) return;
      return lastPage.nextPage;
    },
  });
};
