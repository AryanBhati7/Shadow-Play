import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../constants";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getWatchHistory = async () => {
  try {
    const { data } = await API.get("/users/watch-history");
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const getUserChannelProfile = async (username) => {
  try {
    const { data } = await API.get(`users/c/${username}`);

    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const updateUserProfile = async (data) => {
  const formData = new FormData();

  if (data) {
    formData.append("avatar", data);
  }

  try {
    const { data } = await API.patch("/users/avatar", formData);
    console.log(data);
    toast.success(data?.message);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const updateUserCoverImage = async (data) => {
  const coverImageForm = new FormData();
  if (data) {
    coverImageForm.append("coverImage", data);
  }
  try {
    const { data } = await API.patch("/users/cover-image", coverImageForm);
    toast.success(data?.message);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const updateAccountDetails = async (newData) => {
  try {
    const { data } = await API.patch("/users/update-account", newData);
    toast.success(data?.message);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};
