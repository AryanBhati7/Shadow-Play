import React, { useState } from "react";
import {
  useCreatePlaylist,
  useUpdatePlaylist,
} from "../../hooks/playlist.hook";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";

const schema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
});

function PlaylistForm({ onClose, isEdit = false, playlist }) {
  const userId = useSelector((state) => state.auth.user?._id);
  console.log(playlist);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: isEdit ? playlist.name : "",
      description: isEdit ? playlist.description : "",
    },
  });
  const { mutateAsync: createPlaylist } = useCreatePlaylist(userId);
  const { mutateAsync: updatePlaylist } = useUpdatePlaylist(userId);

  const onSubmit = async (data) => {
    if (isEdit) {
      const res = await updatePlaylist({ ...playlist, ...data });
      if (res) {
        onClose();
      }
      return;
    }
    const res = await createPlaylist(data);
    if (res) {
      onClose();
    }
  };
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-60">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-md rounded-lg bg-gray-800 p-6">
          <h3 className="w-full mx-auto text-xl font-bold mb-3">
            {isEdit ? "Edit Playlist" : "Create Playlist"}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <label
              htmlFor="playlist-name"
              className="mb-1 inline-block cursor-pointer text-gray-300"
            >
              Name
            </label>
            {errors.name && (
              <span className="text-red-500 text-sm ml-2">
                {errors.name.message}
              </span>
            )}
            <input
              className="w-full mb-3 rounded-lg border border-transparent bg-gray-700 px-3 py-2 text-white outline-none focus:border-purple-500"
              id="playlist-name"
              placeholder="Enter playlist name"
              {...register("name")}
            />
            <label
              htmlFor="playlist-name"
              className="mb-1 inline-block cursor-pointer text-gray-300"
            >
              Description
            </label>
            {errors.description && (
              <span className="text-red-500 text-sm ml-2">
                {errors.description.message}
              </span>
            )}
            <textarea
              className="w-full rounded-lg border border-transparent bg-gray-700 px-3 py-2 text-white outline-none focus:border-purple-500"
              id="playlist-name"
              placeholder="Enter playlist description"
              {...register("description")}
            />
            <button
              type="submit"
              className="mx-auto mt-4 rounded-lg bg-purple-500 px-4 py-2 text-white"
            >
              {isEdit ? "Update playlist" : "Create new playlist"}
            </button>
          </form>
          <button
            onClick={onClose}
            type="button"
            className="absolute top-0 right-0 mt-2 h-8 w-8 flex justify-center items-center mr-2 rounded-full bg-gray-600 p-2 text-white"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaylistForm;
