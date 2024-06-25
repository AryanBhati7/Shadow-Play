import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserPlaylists,
  getPlaylistById,
  updatePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  createPlaylist,
  checkVideoInPlaylist,
} from "../api/playlist.api";

export const usePlaylistsByUser = (userId) => {
  return useQuery({
    queryKey: ["playlists", userId],
    queryFn: () => getUserPlaylists(userId),
  });
};

export const usePlaylistById = (playlistId) => {
  return useQuery({
    queryKey: ["playlist", playlistId],
    queryFn: () => getPlaylistById(playlistId),
  });
};

export const useUpdatePlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updatePlaylist(data),
    onSuccess: () => {
      queryClient.invalidateQueries("playlists");
    },
  });
};

export const useDeletePlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (playlistId) => deletePlaylist(playlistId),
    onSuccess: () => {
      queryClient.invalidateQueries("playlists");
    },
  });
};

export const useCreatePlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createPlaylist(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
  });
};

export const useAddVideoToPlaylist = () => {
  return useMutation({
    mutationFn: ({ videoId, playlistId }) =>
      addVideoToPlaylist(videoId, playlistId),
  });
};

export const useRemoveVideoFromPlaylist = () => {
  return useMutation({
    mutationFn: ({ videoId, playlistId }) =>
      removeVideoFromPlaylist(videoId, playlistId),
  });
};

export const useIsVideoInPlaylist = (videoId, playlistId) => {
  return useQuery({
    queryKey: ["check-video", videoId, playlistId],
    queryFn: () => checkVideoInPlaylist(videoId, playlistId),
  });
};
