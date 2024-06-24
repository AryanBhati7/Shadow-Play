import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Link, Outlet } from "react-router-dom";
import defaultCoverImg from "../assets/default-cover-photo.jpg";

function EditProfile() {
  const channelInfo = useSelector((state) => state.auth.user);
  const editProfileItems = [
    {
      name: "Personal Info",
      path: "personal-info",
    },
    {
      name: "Channel Info",
      path: "channel-info",
    },
    {
      name: "Change Password",
      path: "change-password",
    },
  ];
  console.log(channelInfo);
  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="relative min-h-[150px] w-full pt-[16.28%]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={channelInfo?.coverImage?.url || defaultCoverImg}
            alt="cover-photo"
          />
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="flex flex-wrap gap-4 pb-4 pt-6">
          <span className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
            <img
              src={channelInfo?.avatar?.url || ""}
              alt="channelAvatar"
              className="h-full w-full object-cover"
            />
          </span>
          <div className="mr-auto inline-block">
            <h1 className="font-bolg text-xl">{channelInfo?.fullName}</h1>
            <p className="text-sm text-gray-400">@{channelInfo?.username}</p>
          </div>
          <div className="inline-block">
            <div className="inline-flex min-w-[145px] justify-end">
              <Link
                to={`/channel/${channelInfo?.username}`}
                className="px-4 py-1.5 text-sm text-white bg-[#ae7aff] rounded-md"
              >
                View Channel
              </Link>
            </div>
          </div>
        </div>
        <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
          {editProfileItems.map((item, index) => (
            <li key={index} className="w-full">
              <NavLink
                to={`/edit-profile/${item.path}`}
                className={
                  ({ isActive }) =>
                    isActive
                      ? "w-full border-b-2 border-[#ae7aff] bg-white px-3 py-1.5 text-[#ae7aff]" // Active link color
                      : "w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400" // Inactive link color
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <Outlet />
      </div>
    </section>
  );
}

export default EditProfile;
