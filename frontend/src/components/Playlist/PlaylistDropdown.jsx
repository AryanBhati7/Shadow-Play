import React, { useState } from "react";
import ExistingPlaylist from "./ExistingPlaylist";

function PlaylistDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="relative block">
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className="flex items-center gap-x-2 rounded-lg bg-white px-4 py-1.5 text-black"
      >
        <span className="inline-block w-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
            ></path>
          </svg>
        </span>
        Save
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-full z-10 hidden w-64 overflow-hidden rounded-lg bg-[#121212] p-4 shadow shadow-slate-50/30  peer-focus:block">
          <h3 className="mb-4 text-center text-lg font-semibold">
            Save to playlist
          </h3>
          <ExistingPlaylist />
          <div className="flex flex-col">
            <label
              htmlFor="playlist-name"
              className="mb-1 inline-block cursor-pointer"
            >
              Name
            </label>
            <input
              className="w-full rounded-lg border border-transparent bg-white px-3 py-2 text-black outline-none focus:border-[#ae7aff]"
              id="playlist-name"
              placeholder="Enter playlist name"
            />
            <button className="mx-auto mt-4 rounded-lg bg-[#ae7aff] px-4 py-2 text-black">
              Create new playlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaylistDropdown;
