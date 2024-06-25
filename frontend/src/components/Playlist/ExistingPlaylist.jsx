import React from "react";
import { useSelector } from "react-redux";
import { usePlaylistById, usePlaylistsByUser } from "../../hooks/playlist.hook";
import Playlist from "./Playlist";

function ExistingPlaylist({ videoId }) {
  const userId = useSelector((state) => state.auth.user?._id);

  const {
    data: existingPlaylists,
    isFetched,
    isFetching,
  } = usePlaylistsByUser(userId);

  if (isFetching) return <p>Loading...</p>;

  return (
    <ul className="mb-4">
      {isFetched && existingPlaylists?.length > 0 ? (
        existingPlaylists.map((playlist) => (
          <Playlist
            key={playlist._id}
            playlistId={playlist?._id}
            videoId={videoId}
            playlistName={playlist?.name}
          />
        ))
      ) : (
        <p>No playlists found</p>
      )}
    </ul>
  );
}

export default ExistingPlaylist;
