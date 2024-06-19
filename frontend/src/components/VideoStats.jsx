import React from "react";
import { useChannelVideos } from "../hooks/studio.hook";

function VideoStats() {
  const { data: channelVideos, isLoading } = useChannelVideos();

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
            <tr className="group border">
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
                    className="h-10 w-10 rounded-full"
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      ariaHidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      ></path>
                    </svg>
                  </button>
                  <button className="h-5 w-5 hover:text-[#ae7aff]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      ariaHidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      ></path>
                    </svg>
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
