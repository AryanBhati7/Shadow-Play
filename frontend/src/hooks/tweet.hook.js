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
} from "../api/tweet.api";

export const useTweets = (channelId) => {
  return useQuery({
    queryKey: ["tweets", channelId], // Include channelId in queryKey for uniqueness
    queryFn: () => {
      if (channelId === null || channelId === undefined) {
        return Promise.resolve([]); // Return a resolved promise with default data
      }
      return getChannelTweets(channelId); // Proceed with fetching tweets for valid channelId
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
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
