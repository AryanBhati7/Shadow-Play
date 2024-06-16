import { useQuery, useMutation } from "@tanstack/react-query";
import { login, logout, getCurrentUser } from "../api/api";

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

// const loginMutation = useLogin();

// const handleSubmit = (event) => {
//   event.preventDefault();
//   const user = { username: 'user', password: 'pass' };
//   loginMutation.mutate(user);
