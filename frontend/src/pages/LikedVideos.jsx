import React from "react";
import { useLikedVideos } from "../hooks/like.hook.js";
import { VideolistCard } from "../components/index.js";
import { Link } from "react-router-dom";

function LikedVideos() {
  const { data: likedVideos } = useLikedVideos();

  console.log(likedVideos);
  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="flex flex-col gap-4 p-4">
        {likedVideos &&
          likedVideos.map((video) => (
            <Link to={`/video/${video?.likedVideo?._id}`}>
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
