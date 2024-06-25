import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../constants";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getUserPlaylists = async (userId) => {
  try {
    const { data } = await API.get(`/playlist/user/${userId}`);
    return data?.data?.playlists;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};
