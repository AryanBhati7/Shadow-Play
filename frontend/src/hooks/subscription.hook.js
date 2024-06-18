import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleSubscribe } from "../api/subscription.api";

export const useSubscribe = () => {
  return useMutation({
    mutationFn: (channelId) => toggleSubscribe(channelId),
  });
};
