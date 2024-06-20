import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getVideos,
  getVideoById,
  uploadVideo,
  togglePublishStatus,
} from "../api/video.api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useVideos = () => {
  return useInfiniteQuery({
    queryKey: ["videos"],
    queryFn: ({ page = 1 }) => getVideos(page),
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage === false) return;
      return lastPage.nextPage;
    },
    staleTime: 1000 * 60 * 5, // Add this line
    refetchOnWindowFocus: true,
  });
};

export const useVideoById = (videoId) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["video", videoId],
    queryFn: () => getVideoById(videoId),
    staleTime: 1000 * 60 * 5,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchHistory"] });
    },
  });
};

export const useUploadVideo = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => uploadVideo(data, setUploadProgress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channelVideos"] });
    },
  });

  return {
    ...mutation,
    uploadProgress,
  };
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
