import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../constants";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Assuming API is your Axios instance
API.interceptors.response.use(
  (response) => response, // For successful requests, just return the response
  async (error) => {
    const originalRequest = error.config;
    // Check if the error is due to an expired JWT and we haven't already retried the request
    if (
      error?.response?.data?.error === "jwt expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Mark this request as retried
      try {
        console.log("this refresh access token called");
        const { accessToken } = await refreshAccessToken(); // Assume this function refreshes the token and returns the new one
        // Update the authorization header with the new token
        API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return API(originalRequest); // Retry the original request with the new token
      } catch (refreshError) {
        // If the token refresh fails, reject the promise
        return Promise.reject(refreshError);
      }
    }
    // For all other errors, just return the promise rejection
    return Promise.reject(error);
  }
);

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

export const registerUser = async (data) => {
  const formData = new FormData();

  if (!data.avatar) {
    toast.error("Avatar is required");
    return;
  }
  formData.append("avatar", data.avatar);
  if (data.coverImage) {
    formData.append("coverImage", data.coverImage);
  }
  formData.append("username", data.username);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("fullName", data.fullName);
  try {
    const { data } = await API.post("/users/register", formData);
    toast.success(data?.message);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const changePassword = async (newPassData) => {
  try {
    const { data } = await API.post("/users/change-password", newPassData);
    toast.success(data?.message);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const refreshAccessToken = async () => {
  try {
    const { data } = await API.post("/users/refresh-token");
    return data?.data;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};
