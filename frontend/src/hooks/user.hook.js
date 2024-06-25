import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getWatchHistory,
  getUserChannelProfile,
  updateUserCoverImage,
  updateUserProfile,
  updateAccountDetails,
  updateChannelInfo,
} from "../api/user.api";

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

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateUserProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries("channelInfo");
    },
  });
};

export const useUpdateCoverImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateUserCoverImage(data),
    onSuccess: () => {
      queryClient.invalidateQueries("channelInfo");
    },
  });
};

export const useUpdateAccountDetails = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateAccountDetails(data),
    onSuccess: () => {
      queryClient.invalidateQueries("channelInfo");
      queryClient.invalidateQueries("currentUser");
    },
  });
};

export const useUpdateChannelInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateChannelInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries("channelInfo");
      queryClient.invalidateQueries("currentUser");
    },
  });
};
