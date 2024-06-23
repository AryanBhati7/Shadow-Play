import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../constants";

export const getChannelTweets = async (channelId) => {
  console.log("getChannelTweets called");
  try {
    const { data } = await axios.get(`${BASE_URL}/tweet/user/${channelId}`);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};
