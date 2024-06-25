import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getVideos,
  getVideoById,
  uploadVideo,
  deleteVideo,
  editVideo,
  togglePublishStatus,
} from "../api/video.api";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useVideos = (userId) => {
  return useInfiniteQuery({
    queryKey: userId ? ["videos", userId] : ["videos"],
    queryFn: ({ pageParam = 1 }) =>
      userId ? getVideos(pageParam, userId) : getVideos(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage === false) return;
      return lastPage.nextPage;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useVideoById = (videoId) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["video", videoId],
    queryFn: () => getVideoById(videoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchHistory"] });
    },
    staleTime: 1000 * 60 * 2,
  });
};

export const useUploadVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => uploadVideo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["channelStats"],
      });
      queryClient.invalidateQueries({ queryKey: ["channelVideos"] });
    },
  });
};

export const useTogglePublish = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (videoId) => togglePublishStatus(videoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      queryClient.invalidateQueries({ queryKey: ["channelVideos"] });
    },
  });
};

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (videoId) => deleteVideo(videoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channelVideos"] });
      queryClient.invalidateQueries({ queryKey: ["channelStats"] });
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
};

export const useEditVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ videoId, data }) => editVideo(videoId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      queryClient.invalidateQueries({ queryKey: ["channelVideos"] });
    },
  });
};
