import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../constants";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const login = async (formData) => {
  try {
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

export const getUserChannelProfile = async (userId) => {
  try {
    const { data } = await API.get(`/users/${userId}`);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const getWatchHistory = async () => {
  console.log("Get watch history called");
  try {
    const { data } = await API.get("/users/watch-history");
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};
