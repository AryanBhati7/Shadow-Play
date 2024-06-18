import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  login,
  logout,
  getCurrentUser,
  getVideos,
  getVideoById,
  toggleSubscribe,
  toggleVideoLike,
  getAllComments,
  addComment,
  toggleCommentLike,
} from "../api/api";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: (user) => login(user),
  });
};
export const useAddComment = () => {
  return useMutation({
    mutationFn: ({ videoId, comment }) =>
      addComment(videoId, { content: comment }),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => logout(),
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(),
    staleTime: 1000 * 60 * 2,
  });
};

export const useVideos = () => {
  return useInfiniteQuery({
    queryKey: ["videos"],
    queryFn: (page) => getVideos(page),
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage === false) return;

      return getVideos(lastPage.nextPage);
    },
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

export const useVideoById = (videoId) => {
  return useQuery({
    queryKey: ["videos", videoId],
    queryFn: () => getVideoById(videoId),
    staleTime: 1000 * 30,
  });
};

export const useSubscribe = () => {
  return useMutation({
    mutationFn: (channelId) => toggleSubscribe(channelId),
  });
};

export const useInvalidator = () => {
  const queryClient = useQueryClient();

  return function invalidate(key) {
    queryClient.invalidateQueries(key);
  };
};

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

// export const useComments = (videoId) => {
//   return useQuery({
//     queryKey: ["comments"],
//     queryFn: () => getAllComments(videoId),
//   });
// };
