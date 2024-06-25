import React, { useEffect } from "react";
import { useUserChannelInfo } from "../hooks/user.hook";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdModeEditOutline } from "react-icons/md";
import { setChannel } from "../features/channelSlice";
import { SpButton } from "../components";
import SubscribeButton from "../components/SubscribeButton";
import { NavLink, Link } from "react-router-dom";
import defaultCover from "../assets/default-cover-photo.jpg";

function MyChannel() {
  const { username } = useParams();
  const dispatch = useDispatch();
  const ownerUsername = useSelector((state) => state.auth.user?.username);
  const { data: channelInfo } = useUserChannelInfo(username);
  const isOwner = ownerUsername === username ? true : false;

  useEffect(() => {
    if (channelInfo) {
      dispatch(setChannel(channelInfo));
    }
  }, [channelInfo, dispatch]);

  const channelItems = [
    {
      name: "Videos",
      path: "videos",
    },
    {
      name: "Playlist",
      path: "playlist",
    },
    {
      name: "Tweets",
      path: "tweets",
    },
    {
      name: "Subscribers",
      path: "subscribers",
    },
  ];

  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="relative min-h-[150px] w-full pt-[16.28%]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={channelInfo?.coverImage?.url || defaultCover}
            alt="cover-photo object-contain"
          />
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="flex flex-wrap gap-4 pb-4 pt-6">
          <span className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
            <img
              src={channelInfo?.avatar?.url}
              alt="channelAvatar"
              className="h-full w-full object-cover"
            />
          </span>
          <div className="mr-auto inline-block">
            <h1 className="font-bolg text-xl">{channelInfo?.fullName}</h1>
            <p className="text-sm text-gray-400">@{channelInfo?.username}</p>
            <p className="text-sm text-gray-400">
              {channelInfo?.subscribersCount} Subscribers · 
              {channelInfo?.subscribedToCount} Subscribed
            </p>
            <p>
              {channelInfo?.description ||
                `This channel doesn't have a description yet.`}
            </p>
          </div>
          <div className="inline-block">
            <div className="inline-flex min-w-[145px] justify-end">
              {!isOwner && (
                <SubscribeButton
                  isOwner={isOwner}
                  isSubscribed={channelInfo?.isSubscribed}
                  channelId={channelInfo?._id}
                />
              )}

              {isOwner && (
                <Link to="/edit-profile/personal-info">
                  <SpButton className="flex items-center  gap-3">
                    {" "}
                    <MdModeEditOutline /> Edit
                  </SpButton>
                </Link>
              )}
            </div>
          </div>
        </div>
        <ul className="no-scrollbar sticky top-[66px] z-[2] mx-2 flex flex-row justify-between gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
          {channelItems.map((item, index) => (
            <li key={index} className="w-full">
              <NavLink
                to={`/channel/${username}/${item.path}`}
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

export default MyChannel;
