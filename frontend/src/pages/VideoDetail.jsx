import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useInvalidator, useSubscribe, useVideoById } from "../hooks/queries";
import {
  VideoPlayer,
  Videolist,
  Sidebar,
  Header,
  SpButton,
} from "../components/index.js";
import { setSideBarFullSize } from "../features/uiSlice.js";

function VideoDetail() {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const invalidate = useInvalidator();

  const { mutateAsync: subscribe, data, error } = useSubscribe();
  const { data: video, isLoading, isError } = useVideoById(videoId);

  const handleSubscribe = async (channelId) => {
    await subscribe(channelId);
    invalidate(["videos", videoId]);
  };

  useEffect(() => {
    dispatch(setSideBarFullSize(false));

    return () => {
      dispatch(setSideBarFullSize(true));
    };
  }, []);

  return (
    <section className="w-full pb-[70px] sm:ml-[70px]  sm:pb-0">
      <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
        <div className="col-span-12 w-full">
          <div className="relative mb-4 w-full pt-[56%]">
            <div className="absolute inset-0">
              <div className="h-full w-full">
                {video && <VideoPlayer src={video.video.url} />}
              </div>
            </div>
          </div>
          <div
            className="group mb-4 w-full rounded-lg border p-4 duration-200 hover:bg-white/5 focus:bg-white/5"
            role="button"
            tabIndex="0"
          >
            <div className="flex flex-wrap gap-y-2">
              <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                <h1 className="text-lg font-bold">{video && video.title}</h1>
                <p className="flex text-sm text-gray-200">
                  {video && video.views} Views ·18 hours ago
                </p>
              </div>
              <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                <div className="flex items-center justify-between gap-x-4 md:justify-end lg:justify-between xl:justify-end">
                  <div className="flex overflow-hidden rounded-lg border">
                    <button
                      className="group/btn flex items-center gap-x-2 border-r border-gray-700 px-4 py-1.5 after:content-[attr(data-like)] hover:bg-white/10 focus:after:content-[attr(data-like-alt)]"
                      data-like="3050"
                      data-like-alt="3051"
                    >
                      <span className="inline-block w-5 group-focus/btn:text-[#ae7aff]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                          ></path>
                        </svg>
                      </span>
                    </button>
                    <button
                      className="group/btn flex items-center gap-x-2 px-4 py-1.5 after:content-[attr(data-like)] hover:bg-white/10 focus:after:content-[attr(data-like-alt)]"
                      data-like="20"
                      data-like-alt="21"
                    >
                      <span className="inline-block w-5 group-focus/btn:text-[#ae7aff]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                  <div className="relative block">
                    <button className="peer flex items-center gap-x-2 rounded-lg bg-white px-4 py-1.5 text-black">
                      <span className="inline-block w-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
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
                                aria-hidden="true"
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
                                aria-hidden="true"
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
                                aria-hidden="true"
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
                                aria-hidden="true"
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
                                aria-hidden="true"
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
                                aria-hidden="true"
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
              <div className="block">
                <SpButton
                  onClick={() => handleSubscribe(video?.owner?._id)}
                  className="flex justify-center items-center gap-4"
                >
                  <span className="inline-block w-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                      ></path>
                    </svg>
                  </span>
                  <span className="">
                    {video?.owner?.isSubscribed ? "Subscribed" : "Subscribe"}
                  </span>
                </SpButton>
              </div>
            </div>
            <hr className="my-4 border-white" />
            <div className="h-5 overflow-hidden group-focus:h-auto">
              <p className="text-sm">{video && video.description}</p>
            </div>
          </div>
          {/* Comments */}
          <button className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden">
            <h6 className="font-semibold">573 Comments...</h6>
          </button>
          <div className="fixed inset-x-0 top-full z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none">
            <div className="block">
              <h6 className="mb-4 font-semibold">573 Comments</h6>
              <input
                type="text"
                className="w-full rounded-lg border bg-transparent px-2 py-1 placeholder-white"
                placeholder="Add a Comment"
              />
            </div>
            <hr className="my-4 border-white" />
            <div>
              <div className="flex gap-x-4">
                <div className="mt-2 h-11 w-11 shrink-0">
                  <img
                    src="https://images.pexels.com/photos/18148932/pexels-photo-18148932/free-photo-of-woman-reading-book-on-a-bench.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="sarahjv"
                    className="h-full w-full rounded-full"
                  />
                </div>
                <div className="block">
                  <p className="flex items-center text-gray-200">
                    Sarah Johnson · 
                    <span className="text-sm">17 hour ago</span>
                  </p>
                  <p className="text-sm text-gray-200">@sarahjv</p>
                  <p className="mt-3 text-sm">
                    This series is exactly what I&#x27;ve been looking for!
                    Excited to dive into these advanced React patterns. Thanks
                    for putting this together!
                  </p>
                </div>
              </div>
              <hr className="my-4 border-white" />
            </div>
          </div>
        </div>
        {/* More Videos */}
        <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
          <Videolist />
        </div>
      </div>
    </section>
  );
}

export default VideoDetail;
