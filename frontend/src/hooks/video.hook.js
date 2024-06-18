import { useQuery, useMutation } from "@tanstack/react-query";
import { getVideos, getVideoById } from "../api/video.api";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useVideos = () => {
  return useInfiniteQuery({
    queryKey: ["videos"],
    queryFn: ({ page = 1 }) => getVideos(page),
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
  });
};
