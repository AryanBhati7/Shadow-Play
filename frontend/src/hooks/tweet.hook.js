import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { getChannelTweets } from "../api/tweet.api";

export const useTweets = (channelId) => {
  return useQuery({
    queryKey: ["tweets", channelId],
    queryFn: () => getChannelTweets(channelId),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
