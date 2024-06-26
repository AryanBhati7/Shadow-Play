import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSubscribedChannels,
  toggleSubscribe,
  getChannelSubscribers,
} from "../api/subscription.api";

export const useSubscribe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (channelId) => toggleSubscribe(channelId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subscribedChannels"],
      });
      queryClient.invalidateQueries({
        queryKey: ["channelSubscribers"],
      });
    },
  });
};

export const useSubscribedChannels = (userId) => {
  return useQuery({
    queryKey: ["subscribedChannels", userId],
    queryFn: () => {
      return getSubscribedChannels(userId);
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useChannelSubcribers = (channelId) => {
  return useQuery({
    queryKey: ["channelSubscribers", channelId],
    queryFn: () => getChannelSubscribers(channelId),
    staleTime: 1000 * 60 * 5,
  });
};
