import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";

import {
  getChannelTweets,
  createTweet,
  updateTweet,
  deleteTweet,
  getAllTweets,
} from "../api/tweet.api";

export const useAllTweets = () => {
  return useInfiniteQuery({
    queryKey: ["tweets"],
    queryFn: ({ pageParam = 1 }) => getAllTweets({ pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) {
        return lastPage.nextPage;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};

export const useChannelTweets = (channelId) => {
  return useInfiniteQuery({
    queryKey: ["tweets", channelId],
    queryFn: ({ pageParam = 1 }) => {
      if (channelId === null || channelId === undefined) {
        return Promise.resolve({ docs: [], hasNextPage: false });
      }
      return getChannelTweets({ pageParam, channelId });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) {
        return lastPage.nextPage;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    enabled: !!channelId, // Only run the query if channelId is truthy
  });
};

export const useAddTweet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ tweet }) => createTweet({ content: tweet }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tweets"],
      });
    },
  });
};

export const useEditTweet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ tweetId, tweet }) =>
      updateTweet(tweetId, { content: tweet }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tweets"],
      });
    },
  });
};

export const useDeleteTweet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tweetId) => deleteTweet(tweetId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tweets"],
      });
    },
  });
};
