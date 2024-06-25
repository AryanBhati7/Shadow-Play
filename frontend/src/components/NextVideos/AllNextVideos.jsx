import React from "react";
import { useNextVideos } from "../../hooks/video.hook";
import NextVideoCard from "./NextVideoCard";
import { Link } from "react-router-dom";
import NextVideoCardSkeleton from "../Loading/NextVideoCardSkeleton";

function AllNextVideos({ currentVideoId }) {
  const {
    data: allNextVideos,
    isFetched,
    isFetching,
  } = useNextVideos(currentVideoId);

  if (isFetching) {
    return (
      <div className="flex flex-col gap-3">
        <NextVideoCardSkeleton />
        <NextVideoCardSkeleton />
        <NextVideoCardSkeleton />
        <NextVideoCardSkeleton />
        <NextVideoCardSkeleton />
      </div>
    );
  }
  return (
    <>
      {isFetched &&
        allNextVideos.map((video) => {
          return (
            <Link to={`/video/${video._id}`} key={video._id}>
              <NextVideoCard video={video} />
            </Link>
          );
        })}
    </>
  );
}

export default AllNextVideos;
