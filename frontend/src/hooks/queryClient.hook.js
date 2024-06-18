import { useQueryClient } from "@tanstack/react-query";

export const useInvalidator = () => {
  const queryClient = useQueryClient();

  return function invalidate(...key) {
    queryClient.invalidateQueries(key);
  };
};
