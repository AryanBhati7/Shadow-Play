import React from "react";

function NextVideoCardSkeleton() {
  return (
    <>
      <div className="w-full gap-x-2 border pr-2 md:flex animate-pulse">
        <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
          <div className="w-full pt-[56%] bg-gray-300 rounded">
            <span className="absolute bottom-1 right-1 inline-block rounded bg-gray-400 px-1.5 text-sm h-4 w-12"></span>
          </div>
        </div>
        <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
          <div className="h-12 w-12 shrink-0 md:hidden bg-gray-300 rounded-full"></div>
          <div className="w-full pt-1 md:pt-0">
            <div className="mb-1 h-4 w-3/4 bg-gray-300 rounded"></div>
            <div className="mb-0.5 mt-2 h-4 w-1/2 bg-gray-300 rounded"></div>
            <div className="flex mt-1 h-4 w-1/3 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NextVideoCardSkeleton;
