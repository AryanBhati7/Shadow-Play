import React from "react";
import { useChannelVideos } from "../hooks/studio.hook";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function VideoStats() {
  const { data: channelVideos } = useChannelVideos();

  const togglePublishStatus = () => {
    console.log("Publish status toggled");
  };

  return (
    <table className="w-full min-w-[1200px] border-collapse border text-white">
      <thead>
        <tr>
          <th className="border-collapse border-b p-4">Status</th>
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
              <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                <div className="flex justify-center">
                  <label
                    htmlFor="vid-pub-1"
                    className="relative inline-block w-12 cursor-pointer overflow-hidden"
                  >
                    <input
                      type="checkbox"
                      id="vid-pub-1"
                      className="peer sr-only"
                      checked={video?.isPublished}
                      onChange={togglePublishStatus}
                    />
                    <span className="inline-block h-6 w-full rounded-2xl bg-gray-200 duration-200 after:absolute after:bottom-1 after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-black after:duration-200 peer-checked:bg-[#ae7aff] peer-checked:after:left-7"></span>
                  </label>
                </div>
              </td>
              <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
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
              <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                <div className="flex items-center gap-4">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={video?.thumbnail.url}
                    alt={video?.title}
                  />
                  <h3 className="font-semibold">{video?.title}</h3>
                </div>
              </td>
              <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                <div className="flex justify-center gap-4">
                  <span className="inline-block rounded-xl bg-green-200 px-1.5 py-0.5 text-green-700">
                    {video?.likesCount} likes
                  </span>
                </div>
              </td>
              <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                {video?.createdAt}
              </td>
              <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                <div className="flex gap-4">
                  <button className="h-5 w-5 hover:text-[#ae7aff]">
                    <MdModeEditOutline className="w-6 h-6" />
                  </button>
                  <button className="h-5 w-5 hover:text-[#ae7aff]">
                    <MdDelete className="w-6 h-6" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default VideoStats;
