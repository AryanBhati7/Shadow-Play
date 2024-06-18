import React from "react";
import { formatDuration, timeAgo } from "../assets/timeAgo";

function Videocard({ video }) {
  return (
    <div className="w-full">
      <div className="relative mb-2 w-full pt-[56%]">
        <div className="absolute inset-0">
          <img
            src={video?.thumbnail?.url}
            alt={video?.title}
            className="h-full w-full"
          />
        </div>
        <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
          {video && formatDuration(video?.duration)}
        </span>
      </div>
      <div className="flex gap-x-2">
        <div className="h-10 w-10 shrink-0">
          <img
            src={video?.ownerDetails?.avatar?.url}
            alt={video?.ownerDetails?.username}
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="w-full">
          <h6 className="mb-1 font-semibold">{video?.title}</h6>
          <span className="flex text-sm text-gray-200">
            {video?.views} Views · {timeAgo(video?.createdAt)}
          </span>
          <p className="text-sm text-gray-200">
            {video?.ownerDetails?.username}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Videocard;
