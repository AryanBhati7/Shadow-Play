import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout, getCurrentUser, registerUser } from "../api/auth.api";

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user) => login(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries("currentUser");
    },
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
    staleTime: 1000 * 60 * 5,
  });
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (user) => registerUser(user),
  });
};
