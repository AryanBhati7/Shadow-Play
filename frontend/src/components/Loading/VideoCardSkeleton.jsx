import React from "react";

function VideoCardSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="relative mb-2 w-full pt-[56%]">
        <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700"></div>
        <span className="absolute bottom-1 right-1 inline-block rounded bg-gray-300 dark:bg-gray-700 w-12 h-5"></span>
      </div>
      <div className="flex gap-x-2">
        <div className="h-10 w-10 shrink-0 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-full">
          <div className="mb-1 h-4 w-3/4 bg-gray-300 dark:bg-gray-700"></div>
          <div className="mb-1 h-3 w-1/2 bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
}

export default VideoCardSkeleton;
