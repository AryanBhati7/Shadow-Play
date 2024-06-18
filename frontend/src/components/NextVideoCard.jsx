import React from "react";

function NextVideoCard({ video }) {
  return (
    <>
      <div className="w-full gap-x-2 border pr-2 md:flex">
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
        <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
          <div className="h-12 w-12 shrink-0 md:hidden">
            <img
              src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="reactpatterns"
              className="h-full w-full rounded-full"
            />
          </div>
          <div className="w-full pt-1 md:pt-0">
            <h6 className="mb-1 text-sm font-semibold">
              JavaScript Fundamentals: Variables and Data Types
            </h6>
            <p className="mb-0.5 mt-2 text-sm text-gray-200">Code Master</p>
            <p className="flex text-sm text-gray-200">
              10.3k Views · 44 minutes ago
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default NextVideoCard;
