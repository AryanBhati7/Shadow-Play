import React, { useEffect } from "react";
import { setSideBarFullSize } from "../features/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useChannelStats } from "../hooks/studio.hook";
import { VideoStats, UploadVideo, EditVideo } from "../components/index.js";
import { setShowUploadVideo } from "../features/uiSlice";

import { FaRegEye } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { BiSolidVideos } from "react-icons/bi";
import { CiSquarePlus } from "react-icons/ci";
import { IconContext } from "react-icons";

function MyStudio() {
  const dispatch = useDispatch();
  const channelInfo = useSelector((state) => state.auth.user);
  const showEdit = useSelector((state) => state.ui.showEditVideo);
  const showUpload = useSelector((state) => state.ui.showUploadVideo);

  useEffect(() => {
    dispatch(setSideBarFullSize(false));

    return () => {
      dispatch(setSideBarFullSize(true));
    };
  }, [dispatch]);

  const { data: channelStats, isLoading: statsLoading } = useChannelStats();

  const channelStatsItems = [
    {
      icon: <FaRegEye />,
      title: "Total views",
      value: channelStats?.totalViews,
    },
    {
      icon: <FaUserFriends />,
      title: "Total subscribers",
      value: channelStats?.totalSubscribers,
    },
    {
      icon: <FaHeart />,
      title: "Total likes",
      value: channelStats?.totalLikes,
    },
    {
      icon: <BiSolidVideos />,
      title: "Total videos",
      value: channelStats?.totalVideos,
    },
  ];

  const handleUploadVideoClick = () => {
    dispatch(setShowUploadVideo(true));
  };

  return (
    <>
      <div className="mx-auto  flex w-full max-w-7xl flex-col gap-y-6 px-4 py-8">
        <div className="flex flex-wrap justify-between gap-4">
          <div className="block">
            <h1 className="text-2xl font-bold">
              Welcome Back, {channelInfo?.fullName}
            </h1>
            <p className="text-sm text-gray-300">
              Seamless Video Management, Elevated Results.
            </p>
          </div>
          <div className="block">
            <button
              onClick={handleUploadVideoClick}
              className="inline-flex items-center gap-x-2 bg-[#ae7aff] px-3 py-2 font-semibold text-black"
            >
              <CiSquarePlus className="text-black font-bold text-2xl" />
              Upload video
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
          <IconContext.Provider value={{ className: "text-2xl font-bold" }}>
            {channelStatsItems.map((item, index) => (
              <div key={index} className="border p-4">
                <div className="mb-4 block">
                  <span className="h-9 w-9 flex justify-center items-center rounded-full bg-[#E4D3FF] p-1 text-[#ae7aff]">
                    {item.icon}
                  </span>
                </div>
                <h6 className="text-gray-300">{item.title}</h6>
                <p className="text-3xl font-semibold">{item.value}</p>
              </div>
            ))}
          </IconContext.Provider>
        </div>

        {/* {These are the modals only showned when their respective state in store changes} */}
        <UploadVideo />
        <EditVideo />

        <VideoStats />
      </div>
    </>
  );
}

export default MyStudio;
