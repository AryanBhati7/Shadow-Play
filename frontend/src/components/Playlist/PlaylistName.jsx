import React from "react";
import {
  useAddVideoToPlaylist,
  useIsVideoInPlaylist,
  useRemoveVideoFromPlaylist,
} from "../../hooks/playlist.hook";
import { useState } from "react";
function PlaylistName({ playlistId, videoId, playlistName }) {
  const { data: isAdded } = useIsVideoInPlaylist(videoId, playlistId);
  const [added, setAdded] = useState(isAdded || false);

  const { mutateAsync: addVideoToPlaylist } = useAddVideoToPlaylist();
  const { mutateAsync: removeVideoFromPlaylist } = useRemoveVideoFromPlaylist();
  const handleAddVideoToPlaylist = async () => {
    await addVideoToPlaylist({ videoId, playlistId });
  };

  const handleRemoveVideoFromPlaylist = async () => {
    await removeVideoFromPlaylist({ videoId, playlistId });
  };
  return (
    <li key={playlistId} className="mb-2 last:mb-0">
      <label
        className="group/label inline-flex cursor-pointer items-center gap-x-3"
        htmlFor={`${playlistId}-checkbox`}
      >
        <input
          type="checkbox"
          className="peer hidden"
          id={`${playlistId}-checkbox`}
          defaultChecked={added}
          onChange={(e) => {
            if (e.target.checked) {
              setAdded(true);
              handleAddVideoToPlaylist();
            } else {
              setAdded(false);
              handleRemoveVideoFromPlaylist();
            }
          }}
        />
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            ></path>
          </svg>
        </span>
        {playlistName}
      </label>
    </li>
  );
}

export default PlaylistName;
