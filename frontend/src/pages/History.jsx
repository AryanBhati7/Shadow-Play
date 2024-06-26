import React from "react";
import { useWatchHistory } from "../hooks/user.hook";
import { VideolistCard, VideolistCardSkeleton } from "../components/index";
import { Link } from "react-router-dom";

function History() {
  const { data: watchHistory, isLoading } = useWatchHistory();
  if (isLoading)
    return (
      <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <div className="flex flex-col gap-4 p-4">
          {Array(5)
            .fill()
            .map((_, index) => (
              <VideolistCardSkeleton key={index} />
            ))}
        </div>
      </section>
    );

  return (
    <>
      <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <h1 className="text-3xl font-bold my-2 ml-4">History </h1>

        <div className="flex flex-col gap-4 p-4">
          {watchHistory &&
            watchHistory.map((video) => (
              <Link to={`/video/${video?.video?._id}`} key={video?.video?._id}>
                <VideolistCard video={video.video} />
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}

export default History;
