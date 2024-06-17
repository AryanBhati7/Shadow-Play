import React from "react";

function VideoList() {
  return (
    <>
      <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
        <div className="w-full pt-[56%]">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="JavaScript Fundamentals: Variables and Data Types"
              className="h-full w-full"
            />
          </div>
          <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
            20:45
          </span>
        </div>
      </div>
      <div className="flex gap-x-2 md:w-7/12">
        <div className="h-10 w-10 shrink-0 md:hidden">
          <img
            src="https://images.pexels.com/photos/3532545/pexels-photo-3532545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="codemaster"
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="w-full">
          <h6 className="mb-1 font-semibold md:max-w-[75%]">
            JavaScript Fundamentals: Variables and Data Types
          </h6>
          <p className="flex text-sm text-gray-200 sm:mt-3">
            10.3k Views · 44 minutes ago
          </p>
          <div className="flex items-center gap-x-4">
            <div className="mt-2 hidden h-10 w-10 shrink-0 md:block">
              <img
                src="https://images.pexels.com/photos/3532545/pexels-photo-3532545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="codemaster"
                className="h-full w-full rounded-full"
              />
            </div>
            <p className="text-sm text-gray-200">Code Master</p>
          </div>
          <p className="mt-2 hidden text-sm md:block">
            Learn the basics of JavaScript, including variables, data types, and
            how to use them in your programs.
          </p>
        </div>
      </div>
    </>
  );
}

export default VideoList;
