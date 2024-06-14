import { useQuery, useMutation } from "@tanstack/react-query";
import { login, logout } from "../api/api";

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
