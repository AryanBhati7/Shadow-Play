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
  console.log("Getvideo by id called");
  try {
    const { data } = await API.get(`/video/${videoId}`);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};
