import React from "react";
import { useUserChannelInfo } from "../hooks/user.hook";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdModeEditOutline } from "react-icons/md";
import { SpButton } from "../components";
import SubscribeButton from "../components/SubscribeButton";

function MyContent() {
  const { username } = useParams();
  const ownerUsername = useSelector((state) => state.auth.user?.username);
  const { data: channelInfo } = useUserChannelInfo(username);
  const isOwner = ownerUsername === username ? true : false;
  console.log(channelInfo);

  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="relative min-h-[150px] w-full pt-[16.28%]">
        <div className="absolute inset-0 overflow-hidden">
          <img src={channelInfo?.thumbnail?.url || ""} alt="cover-photo" />
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
                <SpButton className="flex items-center  gap-3">
                  {" "}
                  <MdModeEditOutline /> Edit
                </SpButton>
              )}
            </div>
          </div>
        </div>
        <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
          <li className="w-full">
            <button className="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">
              Videos
            </button>
          </li>
          <li className="w-full">
            <button className="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">
              Playlist
            </button>
          </li>
          <li className="w-full">
            <button className="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">
              Tweets
            </button>
          </li>
          <li className="w-full">
            <button className="w-full border-b-2 border-[#ae7aff] bg-white px-3 py-1.5 text-[#ae7aff]">
              Subscribed
            </button>
          </li>
        </ul>
        <div className="flex justify-center p-4">
          <div className="w-full max-w-sm text-center">
            <p className="mb-3 w-full">
              <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
                <span className="inline-block w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    ></path>
                  </svg>
                </span>
              </span>
            </p>
            <h5 className="mb-2 font-semibold">No people subscribers</h5>
            <p>
              This channel has yet to
              <strong>subscribe</strong>a new channel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyContent;
