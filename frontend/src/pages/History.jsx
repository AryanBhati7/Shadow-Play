import React from "react";
import { useWatchHistory } from "../hooks/user.hook";
import { VideolistCard } from "../components/index";
import { Link } from "react-router-dom";

function History() {
  const { data: watchHistory } = useWatchHistory();

  console.log(watchHistory);

  return (
    <>
      <section class="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <div class="flex flex-col gap-4 p-4">
          {watchHistory &&
            watchHistory.map((video) => (
              <Link to={`/video/${video?._id}`}>
                <VideolistCard key={video._id} video={video} />
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}

export default History;
