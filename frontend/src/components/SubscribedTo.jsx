import React from "react";

function SubscribedTo() {
  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-x-2">
        <div className="h-14 w-14 shrink-0">
          <img
            src="https://images.pexels.com/photos/3532545/pexels-photo-3532545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Code Master"
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="block">
          <h6 className="font-semibold">Code Master</h6>
          <p className="text-sm text-gray-300">20K Subscribers</p>
        </div>
      </div>
      <div className="block">
        <button className="group/btn px-3 py-2 text-black bg-[#ae7aff] focus:bg-white">
          <span className="group-focus/btn:hidden">Subscribed</span>
          <span className="hidden group-focus/btn:inline">Subscribe</span>
        </button>
      </div>
    </div>
  );
}

export default SubscribedTo;
