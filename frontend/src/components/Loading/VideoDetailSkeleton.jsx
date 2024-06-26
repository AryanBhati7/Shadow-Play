import React from "react";

const VideoDetailSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-black text-white">
      {/* Main content */}
      <div className="w-full lg:w-3/4 p-4">
        {/* Video player skeleton */}
        <div className="aspect-video bg-gray-800 rounded-lg animate-pulse mb-4">
          <div className="h-full flex items-center justify-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
            </div>
          </div>
        </div>

        {/* Video controls skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-24 h-3 bg-gray-700 rounded-full animate-pulse"></div>
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        {/* Title skeleton */}
        <div className="h-6 bg-gray-700 rounded-md animate-pulse mb-4"></div>

        {/* Meta info and buttons skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse mr-3"></div>
            <div>
              <div className="h-4 w-32 bg-gray-700 rounded-md animate-pulse mb-2"></div>
              <div className="h-3 w-24 bg-gray-700 rounded-md animate-pulse"></div>
            </div>
          </div>
          <div className="flex space-x-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="w-20 h-8 bg-gray-700 rounded-full animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-700 rounded-md animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded-md animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded-md animate-pulse w-3/4"></div>
        </div>
      </div>

      {/* Recommended videos skeleton */}
      <div className="w-full lg:w-1/4 p-4 space-y-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex space-x-2">
            <div className="w-40 h-24 bg-gray-800 rounded-lg animate-pulse"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-700 rounded-md animate-pulse mb-2"></div>
              <div className="h-3 bg-gray-700 rounded-md animate-pulse w-3/4 mb-1"></div>
              <div className="h-3 bg-gray-700 rounded-md animate-pulse w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoDetailSkeleton;
