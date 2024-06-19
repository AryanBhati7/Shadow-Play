import { getChannelStats, getChannelVideos } from "../api/studio.api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useChannelStats = () => {
  return useQuery({
    queryKey: ["channelStats"],
    queryFn: getChannelStats,
    staleTime: 1000 * 60 * 5,
  });
};

export const useChannelVideos = () => {
  return useQuery({
    queryKey: ["channelVideos"],
    queryFn: getChannelVideos,
    staleTime: 1000 * 60 * 5,
  });
};
