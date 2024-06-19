import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useInvalidator } from "../hooks/queryClient.hook.js";
import { useSubscribe } from "../hooks/subscription.hook.js";
import { useVideoById } from "../hooks/video.hook.js";
import { LiaUserCheckSolid } from "react-icons/lia";
import { HiOutlineUserAdd } from "react-icons/hi";
import {
  VideoPlayer,
  NextVideoCard,
  SpButton,
  Like,
  CommentBox,
  Button,
} from "../components/index.js";
import { setSideBarFullSize } from "../features/uiSlice.js";
import { setVideo } from "../features/videoSlice.js";
import { timeAgo } from "../assets/timeAgo.js";

function VideoDetail() {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const invalidate = useInvalidator();

  const { mutateAsync: subscribe } = useSubscribe();
  const { data: video, isLoading, isError } = useVideoById(videoId);

  const handleSubscribe = async (channelId) => {
    await subscribe(channelId);
  };
  console.log(video);

  const userId = useSelector((state) => state.auth.user?._id);
  const isOwner = video?.owner?._id === userId ? true : false;
  useEffect(() => {
    dispatch(setSideBarFullSize(false));
    if (video) {
      dispatch(setVideo(video));
    }

    return () => {
      dispatch(setSideBarFullSize(true));
    };
  }, [dispatch, video]);

  if (isLoading) {
    return <div>Loading...</div>;
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
                  <div className="relative block">
                    <button className="peer flex items-center gap-x-2 rounded-lg bg-white px-4 py-1.5 text-black">
                      <span className="inline-block w-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          ariaHidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                          ></path>
                        </svg>
                      </span>
                      Save
                    </button>
                    <div className="absolute right-0 top-full z-10 hidden w-64 overflow-hidden rounded-lg bg-[#121212] p-4 shadow shadow-slate-50/30 hover:block peer-focus:block">
                      <h3 className="mb-4 text-center text-lg font-semibold">
                        Save to playlist
                      </h3>
                      <ul className="mb-4">
                        <li className="mb-2 last:mb-0">
                          <label
                            className="group/label inline-flex cursor-pointer items-center gap-x-3"
                            htmlFor="Collections-checkbox"
                          >
                            <input
                              type="checkbox"
                              className="peer hidden"
                              id="Collections-checkbox"
                            />
                            <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="3"
                                stroke="currentColor"
                                ariaHidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4.5 12.75l6 6 9-13.5"
                                ></path>
                              </svg>
                            </span>
                            Collections
                          </label>
                        </li>
                        <li className="mb-2 last:mb-0">
                          <label
                            className="group/label inline-flex cursor-pointer items-center gap-x-3"
                            htmlFor="JavaScript Basics-checkbox"
                          >
                            <input
                              type="checkbox"
                              className="peer hidden"
                              id="JavaScript Basics-checkbox"
                            />
                            <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="3"
                                stroke="currentColor"
                                ariaHidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4.5 12.75l6 6 9-13.5"
                                ></path>
                              </svg>
                            </span>
                            JavaScript Basics
                          </label>
                        </li>
                        <li className="mb-2 last:mb-0">
                          <label
                            className="group/label inline-flex cursor-pointer items-center gap-x-3"
                            htmlFor="C++ Tuts-checkbox"
                          >
                            <input
                              type="checkbox"
                              className="peer hidden"
                              id="C++ Tuts-checkbox"
                            />
                            <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="3"
                                stroke="currentColor"
                                ariaHidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4.5 12.75l6 6 9-13.5"
                                ></path>
                              </svg>
                            </span>
                            C++ Tuts
                          </label>
                        </li>
                        <li className="mb-2 last:mb-0">
                          <label
                            className="group/label inline-flex cursor-pointer items-center gap-x-3"
                            htmlFor="Feel Good Music-checkbox"
                          >
                            <input
                              type="checkbox"
                              className="peer hidden"
                              id="Feel Good Music-checkbox"
                            />
                            <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="3"
                                stroke="currentColor"
                                ariaHidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4.5 12.75l6 6 9-13.5"
                                ></path>
                              </svg>
                            </span>
                            Feel Good Music
                          </label>
                        </li>
                        <li className="mb-2 last:mb-0">
                          <label
                            className="group/label inline-flex cursor-pointer items-center gap-x-3"
                            htmlFor="Ed Sheeran-checkbox"
                          >
                            <input
                              type="checkbox"
                              className="peer hidden"
                              id="Ed Sheeran-checkbox"
                            />
                            <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="3"
                                stroke="currentColor"
                                ariaHidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4.5 12.75l6 6 9-13.5"
                                ></path>
                              </svg>
                            </span>
                            Ed Sheeran
                          </label>
                        </li>
                        <li className="mb-2 last:mb-0">
                          <label
                            className="group/label inline-flex cursor-pointer items-center gap-x-3"
                            htmlFor="Python-checkbox"
                          >
                            <input
                              type="checkbox"
                              className="peer hidden"
                              id="Python-checkbox"
                            />
                            <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="3"
                                stroke="currentColor"
                                ariaHidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4.5 12.75l6 6 9-13.5"
                                ></path>
                              </svg>
                            </span>
                            Python
                          </label>
                        </li>
                      </ul>
                      <div className="flex flex-col">
                        <label
                          htmlFor="playlist-name"
                          className="mb-1 inline-block cursor-pointer"
                        >
                          Name
                        </label>
                        <input
                          className="w-full rounded-lg border border-transparent bg-white px-3 py-2 text-black outline-none focus:border-[#ae7aff]"
                          id="playlist-name"
                          placeholder="Enter playlist name"
                        />
                        <button className="mx-auto mt-4 rounded-lg bg-[#ae7aff] px-4 py-2 text-black">
                          Create new playlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
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

              {!isOwner && (
                <>
                  {video?.owner?.isSubscribed ? (
                    <Button
                      onClick={() => handleSubscribe(video?.owner?._id)}
                      className={` flex justify-center items-center gap-3 mr-1  bg-[#b2b2b2] px-3 py-2 text-center font-bold text-black  transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto `}
                    >
                      <LiaUserCheckSolid className="w-5 h-5" />
                      Subscribed
                    </Button>
                  ) : (
                    <SpButton
                      onClick={() => handleSubscribe(video?.owner?._id)}
                      className="flex justify-center items-center gap-4"
                    >
                      <HiOutlineUserAdd className="w-5 h-5" />
                      Subscribe
                    </SpButton>
                  )}
                </>
              )}
            </div>
            <hr className="my-4 border-white" />
            <div className="h-5 overflow-hidden group-focus:h-auto">
              <p className="text-sm">{video && video.description}</p>
            </div>
          </div>

          <CommentBox videoId={video && video?._id} />
        </div>
        {/* More Videos */}
        <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
          <NextVideoCard />
          <NextVideoCard />
          <NextVideoCard />
          <NextVideoCard />
          <NextVideoCard />
          <NextVideoCard />
        </div>
      </div>
    </section>
  );
}

export default VideoDetail;
