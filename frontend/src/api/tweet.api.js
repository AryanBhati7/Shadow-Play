import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../constants";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getAllTweets = async ({ pageParam = 1, authenticated = true }) => {
  try {
    const { data } = await API.get(
      `/tweet${authenticated ? "" : "?guest=true"}`,
      {
        params: { page: pageParam, limit: 10 },
      }
    );
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Failed to fetch tweets");
    throw error?.response?.data?.error;
  }
};
export const getChannelTweets = async ({ pageParam = 1, channelId }) => {
  try {
    const { data } = await API.get(`/tweet/user/${channelId}`, {
      params: { page: pageParam, limit: 10 },
    });
    return data?.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.error || "Failed to fetch channel tweets"
    );
    throw error?.response?.data?.error;
  }
};

export const createTweet = async (tweet) => {
  try {
    const { data } = await API.post("/tweet/", tweet);
    toast.success(data?.message);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const updateTweet = async (tweetId, tweet) => {
  try {
    const { data } = await API.patch(`/tweet/${tweetId}`, tweet);
    toast.success(data?.message);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const deleteTweet = async (tweetId) => {
  try {
    const { data } = await API.delete(`/tweet/${tweetId}`);
    toast.success(data?.message);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};
