import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useVideoById = (videoId) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["video", videoId],
    queryFn: () => getVideoById(videoId),
    // staleTime: 1000 * 60 * 5, // 5 minutes
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchHistory"] });
    },
  });
};
