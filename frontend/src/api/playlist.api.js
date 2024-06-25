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
    return data?.data;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};

export const getPlaylistById = async (playlistId) => {
  try {
    const { data } = await API.get(`/playlist/${playlistId}`);
    return data?.data;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};

export const updatePlaylist = async (playlistId, playlistData) => {
  // const { name, description } = req.body;
  try {
    const { data } = await API.patch(`/playlist/${playlistId}`, playlistData);
    toast.success(data?.message);
    return data?.data;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};

export const deletePlaylist = async (playlistId) => {
  try {
    const { data } = await API.delete(`/playlist/${playlistId}`);
    toast.success(data?.message);
    return data?.data;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};

export const createPlaylist = async (playlistData) => {
  // const { name, description } = req.body;

  try {
    const { data } = await API.post("/playlist", playlistData);
    toast.success(data?.message);
    return data?.data;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};

export const addVideoToPlaylist = async (videoId, playlistId) => {
  try {
    const { data } = await API.patch(`/playlist/add/${videoId}/${playlistId}`);
    toast.success(data?.message);
    return data?.data;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};

export const removeVideoFromPlaylist = async (videoId, playlistId) => {
  try {
    const { data } = await API.patch(
      `/playlist/remove/${videoId}/${playlistId}`
    );
    toast.success(data?.message);
    return data?.data;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};

export const checkVideoInPlaylist = async (videoId, playlistId) => {
  try {
    const { data } = await API.get(
      `/playlist/check-video/${playlistId}/${videoId}`
    );
    return data?.data?.isPresent;
  } catch (error) {
    throw error?.response?.data?.error;
  }
};
