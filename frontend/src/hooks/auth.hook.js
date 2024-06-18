import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout, getCurrentUser } from "../api/user.api";

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
    staleTime: 1000 * 60 * 2,
  });
};
