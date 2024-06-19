import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getWatchHistory } from "../api/user.api";

export const useWatchHistory = () => {
  return useQuery({
    queryKey: ["watchHistory"],
    queryFn: () => getWatchHistory(),
  });
};
