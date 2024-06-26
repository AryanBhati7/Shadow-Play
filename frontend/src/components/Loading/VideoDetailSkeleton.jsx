import React from "react";

const VideoDetailSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-900 text-white p-4">
      {/* Video player skeleton */}
      <div className="w-full md:w-2/3 aspect-video bg-gray-900 rounded-lg animate-pulse mb-4 md:mb-0 md:mr-4">
        <div className="h-full flex items-center justify-center">
          <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-gray-500 border-b-8 border-b-transparent ml-1"></div>
          </div>
        </div>
      </div>

      {/* Video details skeleton */}
      <div className="w-full md:w-1/3 flex flex-col">
        {/* Title skeleton */}
        <div className="h-8 bg-gray-700 rounded-md animate-pulse mb-4"></div>

        {/* Meta info skeleton */}
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse mr-3"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-700 rounded-md animate-pulse mb-2"></div>
            <div className="h-3 bg-gray-700 rounded-md animate-pulse w-2/3"></div>
          </div>
        </div>

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded-md animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded-md animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded-md animate-pulse w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailSkeleton;
