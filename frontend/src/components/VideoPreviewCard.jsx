import React, { useState } from "react";
import { BsCardImage } from "react-icons/bs";

export default function VideoPreviewCard({
  video,
  thumbnail,
  title,
  description,
  name,
}) {
  const [thumbnailSrc, setThumbnailSrc] = useState(thumbnail);
  const [videoSrc, setVideoSrc] = useState(video);

  const [titleState, setTitleState] = useState(title);
  const [descriptionState, setDescriptionState] = useState(description);

  if (thumbnail && typeof thumbnail !== "string") {
    setThumbnailSrc(URL.createObjectURL(thumbnail));
  }

  return (
    <div className="w-full bg-gray-800 rounded-lg shadow-md overflow-hidden text-white">
      <div className="relative mb-2 w-full pt-[56%]">
        <div className="absolute inset-0">
          {thumbnailSrc && videoSrc ? (
            <img
              src={thumbnailSrc}
              alt="thumbnail-videocard"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center">
              <BsCardImage className="w-full h-full" />
              <p className="mt-2">
                Please upload both Video and Thumbnail to see Preview
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <h6 className="mb-2 font-semibold text-lg">
          {titleState ? titleState : "Video Title"}
        </h6>
        <p className="text-sm text-gray-300 mb-2">
          {descriptionState && descriptionState.length > 250
            ? `${descriptionState.substring(0, 250)}...`
            : descriptionState
            ? descriptionState
            : "Video description ........"}
        </p>
        <p className="text-sm text-gray-500">By {name}</p>
      </div>
    </div>
  );
}
