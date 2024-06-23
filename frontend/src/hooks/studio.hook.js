import { getChannelStats, getChannelVideos } from "../api/studio.api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useChannelStats = () => {
  return useQuery({
    queryKey: ["channelStats"],
    queryFn: getChannelStats,
  });
};

export const useChannelVideos = () => {
  return useQuery({
    queryKey: ["channelVideos"],
    queryFn: getChannelVideos,
  });
};
