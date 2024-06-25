import React from "react";

function PlaylistSkeleton() {
  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="flex flex-wrap gap-x-4 gap-y-10 p-4 xl:flex-nowrap">
        <div className="w-full shrink-0 sm:max-w-md xl:max-w-sm">
          <div className="h-64 w-full animate-pulse bg-gray-700 rounded-lg"></div>
          <div className="mt-6 flex items-center gap-x-3">
            <div className="h-16 w-16 shrink-0 animate-pulse bg-gray-700 rounded-full"></div>
            <div className="w-full">
              <div className="h-4 w-3/4 animate-pulse bg-gray-700 rounded"></div>
              <div className="h-3 w-1/2 animate-pulse bg-gray-700 rounded mt-2"></div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-y-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="h-24 w-full animate-pulse bg-gray-700 rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PlaylistSkeleton;
