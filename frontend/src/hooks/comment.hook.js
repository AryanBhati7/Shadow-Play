import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addComment,
  deleteComment,
  getAllComments,
  updateComment,
} from "../api/comment.api";

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ videoId, comment }) =>
      addComment(videoId, { content: comment }),

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.videoId],
      });
    },
  });
};
export const useEditComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, comment }) =>
      updateComment(commentId, { content: comment }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });
};

export const useComments = (videoId, authenticated) => {
  return useInfiniteQuery({
    queryKey: ["comments", videoId],
    queryFn: ({ pageParam = 1 }) =>
      getAllComments(videoId, authenticated, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage === false) return;
      return lastPage.nextPage;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};
