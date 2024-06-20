import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../constants";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getVideos = async (
  page = null,
  userId = null,
  sortBy = null,
  sortType = null,
  query = null,
  limit = null
) => {
  try {
    const url = new URL(`${BASE_URL}/video`);

    if (userId) url.searchParams.set("userId", userId);
    if (sortBy) url.searchParams.set("sortBy", sortBy);
    if (sortType) url.searchParams.set("sortType", sortType);
    if (query) url.searchParams.set("query", query);
    if (page) url.searchParams.set("page", page);
    if (limit) url.searchParams.set("limit", limit);

    if (sortBy && sortType) {
      url.searchParams.set("sortBy", sortBy);
      url.searchParams.set("sortType", sortType);
    }

    const response = await API.get(url.href + "/");
    return response?.data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    console.log(error);
    throw error?.response?.data?.error;
  }
};

export const getVideoById = async (videoId) => {
  try {
    const { data } = await API.get(`/video/v/${videoId}`);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const uploadVideo = async (data, onUploadProgress) => {
  const videoData = new FormData();
  videoData.append("video", data.video);
  videoData.append("thumbnail", data.thumbnail);
  videoData.append("title", data.title);
  videoData.append("description", data.description);
  videoData.append("isPublished", false);
  try {
    const { data } = await API.post("/video/", videoData, {
      onUploadProgress: (progressEvent) => {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 80) / progressEvent.total
        );
        onUploadProgress(percentCompleted);
      },
    });
    // When the response is received, set progress to 100%
    onUploadProgress(100);
    toast.success(data?.message);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const togglePublishStatus = async (videoId) => {
  try {
    const { data } = await API.patch(`/video/toggle/publish/${videoId}`);
    toast.success(data?.message);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};
