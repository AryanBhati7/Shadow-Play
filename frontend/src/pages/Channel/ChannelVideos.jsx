import React from "react";
import { useVideos } from "../../hooks/video.hook";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { VideoCardSkeleton, Videocard } from "../../components/index";

function ChannelVideos() {
  const channelId = useSelector((state) => state.channel.channel?._id);

  const {
    data: channelVideos,
    isFetching,
    isFetched,
  } = useVideos({ userId: channelId });

  console.log(channelVideos);
  if (isFetching) {
    return (
      <>
        <div className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
            {Array(8)
              .fill()
              .map((_, index) => (
                <VideoCardSkeleton key={index} />
              ))}
          </div>
        </div>
      </>
    );
  }

  if (channelVideos?.pages[0]?.totalDocs === 0) {
    return (
      <div className="flex justify-center p-4">
        <div className="w-full max-w-sm text-center">
          <p className="mb-3 w-full">
            <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
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
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                ></path>
              </svg>
            </span>
          </p>
          <h5 className="mb-2 font-semibold">No videos uploaded</h5>
          <p>
            This page has yet to upload a video. Search another page in order to
            find more videos.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4  ${
        channelVideos?.pages?.[0]?.docs.length === 1
          ? "justify-items-start"
          : ""
      }`}
    >
      {isFetched &&
        channelVideos?.pages.map((page, index) => {
          return (
            <React.Fragment key={index}>
              {isFetched &&
                page.docs.map((video) => {
                  return (
                    <Link to={`/video/${video._id}`} key={video._id}>
                      <Videocard video={video} />
                    </Link>
                  );
                })}
            </React.Fragment>
          );
        })}
    </div>
  );
}

export default ChannelVideos;
