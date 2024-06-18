import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:8000/api/v1";
const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const login = async (formData) => {
  try {
    console.log(formData);
    const { data } = await API.post("/users/login", formData);
    toast.success(data?.message);
    return data?.data?.user;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const logout = async () => {
  try {
    const { data } = await API.post("/users/logout");
    toast.success(data?.message);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data } = await API.get("/users/current-user");
    return data?.data?.user;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};

export const getVideos = async (
  page = 1,
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
    const response = await API.get(url.href);

    return response?.data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    console.log(error);
    throw error?.response?.data?.error;
  }
};

export const getVideoById = async (videoId) => {
  try {
    const { data } = await API.get(`/video/${videoId}`);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const getUserChannelProfile = async (userId) => {
  try {
    const { data } = await API.get(`/users/${userId}`);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

//Toggle Subscribe
export const toggleSubscribe = async (channelId) => {
  try {
    const { data } = await API.post(`/subscription/c/${channelId}`);
    toast.success(data?.message);
    return data?.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

//Like
export const toggleVideoLike = async (videoId) => {
  try {
    const { data } = await API.post(`/like/toggle/v/${videoId}`);
    toast.success(data?.message);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const toggleCommentLike = async (commentId) => {
  try {
    const { data } = await API.post(`/like/toggle/c/${commentId}`);
    toast.success(data?.message);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const getAllComments = async (videoId = null, page = null) => {
  try {
    const url = new URL(`${BASE_URL}/comment/${videoId}`);

    if (page) url.searchParams.set("page", page);
    // if (limit) url.searchParams.set("limit", limit);
    const { data } = await API.get(url.href);
    console.log(data.data);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const addComment = async (videoId, comment) => {
  console.log(comment);
  try {
    const { data } = await API.post(`/comment/${videoId}`, comment);
    toast.success(data?.message);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};
