import React from "react";

const MyChannelSkeleton = () => {
  return (
    <div className="w-full bg-gray-900 text-white animate-pulse">
      {/* Banner */}
      <div className="w-full h-48 bg-gray-800"></div>

      {/* Profile section */}
      <div className="flex items-center p-4">
        <div className="w-20 h-20 rounded-full bg-gray-700 mr-4"></div>
        <div className="flex-1">
          <div className="h-6 bg-gray-700 w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-700 w-1/3"></div>
        </div>
        <div className="w-20 h-8 bg-purple-500 rounded"></div>
      </div>

      {/* Navigation */}
      <div className="flex border-b border-gray-700 mb-4">
        {["Videos", "Playlist", "Tweets", "Subscribers"].map((item, index) => (
          <div key={index} className="px-4 py-2">
            <div className="h-4 bg-gray-700 w-16"></div>
          </div>
        ))}
      </div>

      {/* Video grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="aspect-video bg-gray-800 rounded-lg">
            <div className="w-full h-full flex items-end p-2">
              <div className="h-4 bg-gray-700 w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyChannelSkeleton;
