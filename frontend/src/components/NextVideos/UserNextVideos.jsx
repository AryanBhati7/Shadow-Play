import React from "react";
import { useVideos } from "../../hooks/video.hook";
import NextVideoCard from "./NextVideoCard";
import { Link } from "react-router-dom";
import NextVideoCardSkeleton from "../Loading/NextVideoCardSkeleton";

function UserNextVideos({ userId }) {
  const { data: videosFromUser, isFetching, isFetched } = useVideos(userId);
  console.log(videosFromUser);

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
        videosFromUser?.pages.map((page, index) => {
          return (
            <React.Fragment key={index}>
              {isFetched &&
                page.docs.map((video) => {
                  return (
                    <Link to={`/video/${video._id}`} key={video._id}>
                      <NextVideoCard video={video} />
                    </Link>
                  );
                })}
            </React.Fragment>
          );
        })}
    </>
  );
}

export default UserNextVideos;
