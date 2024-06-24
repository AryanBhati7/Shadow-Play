import React from "react";

function VideolistCardSkeleton() {
  return (
    <div className="flex w-full max-w-3xl space-x-4 animate-pulse">
      <div className="flex-none w-5/12">
        <div className="w-full h-0 pb-[56.25%] bg-gray-300 rounded"></div>
      </div>
      <div className="flex-grow space-y-2 w-7/12">
        <div className="h-10 w-10 rounded-full bg-gray-300"></div>
        <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
        <div className="flex space-x-4">
          <div className="h-3 w-1/4 bg-gray-300 rounded"></div>
          <div className="h-3 w-1/4 bg-gray-300 rounded"></div>
        </div>
        <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-300 rounded"></div>
          <div className="h-3 w-5/6 bg-gray-300 rounded"></div>
          <div className="h-3 w-2/3 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default VideolistCardSkeleton;
