import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../constants";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getAllComments = async (videoId = null, page = null) => {
  try {
    const url = new URL(`${BASE_URL}/comment/${videoId}`);

    if (page) url.searchParams.set("page", page);
    // if (limit) url.searchParams.set("limit", limit);
    const { data } = await API.get(url.href);

    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const addComment = async (videoId, comment) => {
  try {
    const { data } = await API.post(`/comment/${videoId}`, comment);
    toast.success(data?.message);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};
