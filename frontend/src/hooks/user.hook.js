import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  login,
  logout,
  getCurrentUser,
  getWatchHistory,
} from "../api/user.api";

export const useLogin = () => {
  return useMutation({
    mutationFn: (user) => login(user),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => logout(),
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(),
  });
};

export const useWatchHistory = () => {
  return useQuery({
    queryKey: ["watchHistory"],
    queryFn: () => getWatchHistory(),
  });
};
