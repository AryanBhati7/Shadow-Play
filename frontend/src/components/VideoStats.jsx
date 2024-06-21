import React, { useState } from "react";
import { useChannelVideos } from "../hooks/studio.hook";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {
  useDeleteVideo,
  useEditVideo,
  useTogglePublish,
} from "../hooks/video.hook";
import DeletePopup from "./DeletePopup";

function VideoStats() {
  const [deletePopupId, setDeletePopupId] = useState(null);
  const { data: channelVideos, isFetching } = useChannelVideos();

  const { mutateAsync: toggleVideoPublishStatus } = useTogglePublish();
  const { mutateAsync: deleteVideo, isPending: isDeleting } = useDeleteVideo();
  const { mutateAsync: editVideo } = useEditVideo();

  const togglePublishStatus = async (videoId) => {
    await toggleVideoPublishStatus(videoId);
  };

  const handleDelete = async (videoId) => {
    setDeletePopupId(videoId);
  };

  const deleteConfirm = async (videoId) => {
    await deleteVideo(videoId);

    setDeletePopupId(null);
  };

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg md:block hidden">
        <table className="w-full min-w-[1200px] border-collapse border text-white">
          <thead>
            <tr>
              <th className="border-collapse border-b p-4 ">Status</th>
              <th className="border-collapse border-b p-4">Status</th>
              <th className="border-collapse border-b p-4">Uploaded</th>
              <th className="border-collapse border-b p-4">Rating</th>
              <th className="border-collapse border-b p-4">Date uploaded</th>
              <th className="border-collapse border-b p-4"></th>
            </tr>
          </thead>
          <tbody>
            {channelVideos &&
              channelVideos.map((video) => (
                <tr className="group border" key={video._id}>
                  <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none whitespace-nowrap">
                    <div className="flex justify-center">
                      <label className="relative inline-block w-12 cursor-pointer ">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={video?.isPublished}
                          onChange={() => togglePublishStatus(video._id)}
                        />
                        <span className="inline-block h-6 w-full rounded-2xl bg-gray-200 duration-200 after:absolute after:bottom-1 after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-black after:duration-200 peer-checked:bg-[#ae7aff] peer-checked:after:left-7"></span>
                      </label>
                    </div>
                  </td>
                  <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none whitespace-nowrap">
                    <div className="flex justify-center">
                      <span
                        className={`inline-block rounded-2xl border px-1.5 py-0.5 ${
                          video?.isPublished
                            ? "border-green-600 text-green-600"
                            : "border-orange-600 text-orange-600"
                        }`}
                      >
                        {video?.isPublished ? "Published" : "Unpublished"}
                      </span>
                    </div>
                  </td>

                  <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none whitespace-nowrap">
                    {deletePopupId === video._id && (
                      <DeletePopup
                        onDeleteConfirm={() => deleteConfirm(video._id)}
                        onCancel={() => setDeletePopupId(null)}
                        isDeleting={isDeleting}
                      />
                    )}
                    <div className="flex items-center gap-4">
                      <img
                        className="h-10 w-14 rounded-md object-cover"
                        src={video?.thumbnail.url}
                        alt={video?.title}
                      />
                      <h3 className="font-semibold text-center">
                        {video?.title}
                      </h3>
                    </div>
                  </td>
                  <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none whitespace-nowrap">
                    <div className="flex justify-center gap-4">
                      <span className="inline-block rounded-xl bg-green-200 px-1.5 py-0.5 text-green-700">
                        {video?.likesCount} likes
                      </span>
                    </div>
                  </td>
                  <td className="text-center border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none whitespace-nowrap">
                    {new Date(video?.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none whitespace-nowrap">
                    <div className="flex gap-4">
                      <button className="h-5 w-5 hover:text-[#ae7aff]">
                        <MdModeEditOutline className="w-6 h-6" />
                      </button>
                      <button
                        className="h-5 w-5 hover:text-[#ae7aff]"
                        onClick={() => handleDelete(video._id)}
                      >
                        <MdDelete className="w-6 h-6" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden flex flex-wrap justify-between text-white">
        {channelVideos &&
          channelVideos.map((video) => (
            <div
              key={video._id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
            >
              <div className="flex flex-col border-white border border-dashed rounded-lg shadow-md overflow-hidden">
                {deletePopupId === video._id && (
                  <DeletePopup
                    onDeleteConfirm={() => deleteConfirm(video._id)}
                    onCancel={() => setDeletePopupId(null)}
                    isDeleting={isDeleting}
                  />
                )}
                <div className="p-4 gap-3  flex flex-col ">
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center gap-6
                    "
                    >
                      <img
                        className="h-10 w-14 rounded-md object-cover"
                        src={video?.thumbnail.url}
                        alt={video?.title}
                      />
                      <h3 className="font-semibold">{video?.title}</h3>
                    </div>

                    <label className="relative inline-block w-12 cursor-pointer ">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={video?.isPublished}
                        onChange={() => togglePublishStatus(video._id)}
                      />
                      <span className="inline-block h-6 w-full rounded-2xl bg-gray-200 duration-200 after:absolute after:bottom-1 after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-black after:duration-200 peer-checked:bg-[#ae7aff] peer-checked:after:left-7"></span>
                    </label>
                  </div>
                  <div className="flex gap-3">
                    <span
                      className={`inline-block rounded-2xl border px-1.5 py-0.5 ${
                        video?.isPublished
                          ? "border-green-600 text-green-600"
                          : "border-orange-600 text-orange-600"
                      }`}
                    >
                      {video?.isPublished ? "Published" : "Unpublished"}
                    </span>
                    <span className="inline-block rounded-xl bg-green-200 px-1.5 py-0.5 text-green-700">
                      {video?.likesCount} likes
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>
                      Uploaded on{" "}
                      {new Date(video?.createdAt).toLocaleDateString("en-GB")}
                    </p>
                    <div className="flex   border-gray-700 gap-4">
                      <button className="h-5 w-5 hover:text-[#ae7aff]">
                        <MdModeEditOutline className="w-6 h-6" />
                      </button>
                      <button
                        className="h-5 w-5 hover:text-[#ae7aff]"
                        onClick={() => handleDelete(video._id)}
                      >
                        <MdDelete className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div className="mb-[14rem]"></div>
      </div>
    </>
  );
}

export default VideoStats;
