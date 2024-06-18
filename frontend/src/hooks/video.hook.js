import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getVideos, getVideoById } from "../api/video.api";
import { useInfiniteQuery } from "@tanstack/react-query";

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

export const useVideoById = (videoId) => {
  return useQuery({
    queryKey: ["videos", videoId],
    queryFn: () => getVideoById(videoId),
    staleTime: 1000 * 30,
  });
};
