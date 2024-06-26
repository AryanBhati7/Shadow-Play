import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useVideoById } from "../hooks/video.hook.js";

import {
  VideoPlayer,
  NextVideoCard,
  Like,
  CommentBox,
  SubscribeButton,
  PlaylistDropdown,
  NextVideosColumn,
  VideoDetailSkeleton,
} from "../components/index.js";
import { setSideBarFullSize } from "../features/uiSlice.js";
import { setVideo } from "../features/videoSlice.js";
import { timeAgo } from "../assets/timeAgo.js";

function VideoDetail() {
  const dispatch = useDispatch();
  const { videoId } = useParams();

  const { data: video, isError, isFetching } = useVideoById(videoId);

  const userId = useSelector((state) => state.auth.user?._id);
  const isOwner = video?.owner?._id === userId ? true : false;
  useEffect(() => {
    dispatch(setSideBarFullSize(false));

    if (video) {
      dispatch(setVideo(video));
    }

    return () => {
      dispatch(setSideBarFullSize(true));
      dispatch(setVideo(null));
    };
  }, [dispatch, video]);

  if (isFetching) {
    return (
      <section className="w-full pb-[70px] sm:ml-[70px]  sm:pb-0">
        <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
          <div className="col-span-12 w-full">
            <div className="relative mb-4 w-full pt-[56%]">
              <div className="absolute inset-0">
                <div className="h-full w-full ">
                  <VideoDetailSkeleton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full pb-[70px] sm:ml-[70px]  sm:pb-0">
      <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
        <div className="col-span-12 w-full">
          <div className="relative mb-4 w-full pt-[56%]">
            <div className="absolute inset-0">
              <div className="h-full w-full ">
                {video && (
                  <VideoPlayer
                    src={video?.video?.url}
                    thumbnail={video?.thumbnail?.url}
                    title={video?.title}
                    duration={video?.duration}
                  />
                )}
              </div>
            </div>
          </div>
          <div
            className="group mb-4 w-full rounded-lg border p-4 duration-200 hover:bg-white/5 focus:bg-white/5"
            tabIndex="0"
          >
            <div className="flex flex-wrap gap-y-2">
              <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                <h1 className="text-lg font-bold">{video && video.title}</h1>
                <p className="flex text-sm text-gray-200">
                  {video && video.views} Views ·{" "}
                  {video && timeAgo(video.createdAt)}
                </p>
              </div>
              <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                <div className="flex items-center justify-between gap-x-4 md:justify-end lg:justify-between xl:justify-end">
                  <Like
                    type={"videos"}
                    id={video && video?._id}
                    isLiked={video && video?.isLiked}
                    likesCount={video && video?.likesCount}
                    className={"px-4"}
                    iconSize={"w-8"}
                  />
                  <PlaylistDropdown videoId={video?._id} />
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Link to={`/channel/${video?.owner?.username}/videos`}>
                <div className="flex items-center gap-x-4">
                  <div className="mt-2 h-12 w-12 shrink-0">
                    <img
                      src={video && video?.owner?.avatar?.url}
                      alt={video && video?.owner?.username}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                  <div className="block">
                    <p className="text-gray-200">
                      {video && video?.owner?.username}
                    </p>

                    <p className="text-sm text-gray-400">
                      {video && video?.owner?.subscribersCount} Subscribers
                    </p>
                  </div>
                </div>
              </Link>

              {!isOwner && (
                <SubscribeButton
                  isSubscribed={video?.owner?.isSubscribed}
                  channelId={video?.owner?._id}
                />
              )}
            </div>
            <hr className="my-4 border-white" />
            <div className="h-5 overflow-hidden group-focus:h-auto">
              <p className="text-sm">{video && video.description}</p>
            </div>
          </div>

          {video && <CommentBox videoId={video && video?._id} />}
        </div>
        {/* More Videos */}
        <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
          <NextVideosColumn
            name={video?.owner?.fullName}
            videoId={video?._id}
            userId={video?.owner?._id}
          />
        </div>
      </div>
    </section>
  );
}

export default VideoDetail;
