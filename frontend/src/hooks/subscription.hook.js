import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleSubscribe } from "../api/subscription.api";
import { useSelector } from "react-redux";

export const useSubscribe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (channelId) => toggleSubscribe(channelId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["video"],
      });
    },
  });
};
