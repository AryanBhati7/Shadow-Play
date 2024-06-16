import { useQuery, useMutation } from "@tanstack/react-query";
import { login, logout, getCurrentUser, getVideos } from "../api/api";
import { useInfiniteQuery } from "@tanstack/react-query";

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

export const useVideos = () => {
  return useInfiniteQuery({
    queryKey: ["videos"],
    queryFn: (page) => getVideos(page),
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage === false) return;

      return getVideos(lastPage.nextPage);
    },
  });
};
