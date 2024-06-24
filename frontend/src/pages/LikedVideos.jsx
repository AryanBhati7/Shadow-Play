import React from "react";
import { useLikedVideos } from "../hooks/like.hook.js";
import { VideolistCard, VideolistCardSkeleton } from "../components/index.js";
import { Link } from "react-router-dom";

function LikedVideos() {
  const { data: likedVideos, isLoading } = useLikedVideos();

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
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="flex flex-col gap-4 p-4">
        {likedVideos &&
          likedVideos.map((video) => (
            <Link
              to={`/video/${video?.likedVideo?._id}`}
              key={video?.likedVideo?._id}
            >
              <VideolistCard
                video={video?.likedVideo}
                key={video?.likedVideo?._id}
              />
            </Link>
          ))}
      </div>
    </section>
  );
}

export default LikedVideos;
