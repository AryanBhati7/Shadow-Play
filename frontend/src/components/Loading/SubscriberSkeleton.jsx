import React from "react";

function SubscriberSkeleton() {
  return (
    <div className="flex w-full justify-between animate-pulse">
      <div className="flex items-center gap-x-2">
        <div className="h-14 w-14 shrink-0 bg-gray-300 rounded-full"></div>
        <div className="block">
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
          <div className="mt-2 h-3 w-24 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="block">
        <div className="h-10 w-24 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

export default SubscriberSkeleton;
