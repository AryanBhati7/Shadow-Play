import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getWatchHistory, getUserChannelProfile } from "../api/user.api";

export const useWatchHistory = () => {
  return useQuery({
    queryKey: ["watchHistory"],
    queryFn: () => getWatchHistory(),
    refetchOnWindowFocus: true,
  });
};

export const useUserChannelInfo = (username) => {
  return useQuery({
    queryKey: ["channelInfo", username],
    queryFn: () => getUserChannelProfile(username),
    refetchOnWindowFocus: true,
  });
};
