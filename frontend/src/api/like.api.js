import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../constants";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const toggleVideoLike = async (videoId) => {
  try {
    const { data } = await API.post(`/like/toggle/v/${videoId}`);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const toggleCommentLike = async (commentId) => {
  try {
    const { data } = await API.post(`/like/toggle/c/${commentId}`);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const getLikedVideos = async () => {
  try {
    const { data } = await API.get("/like/videos");
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};
