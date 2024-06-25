import React from "react";
import { usePlaylistById } from "../hooks/playlist.hook";
import { Link } from "react-router-dom";
import {
  NextVideoCard,
  PlaylistCard,
  PlaylistSkeleton,
} from "../components/index";
import { useParams } from "react-router-dom";

function Playlist() {
  const { playlistId } = useParams();

  const { data: playlist, isFetching } = usePlaylistById(playlistId);

  if (isFetching) {
    return <PlaylistSkeleton />;
  }

  return (
    <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="flex flex-wrap gap-x-4 gap-y-10 p-4 xl:flex-nowrap">
        <div className="w-full shrink-0 sm:max-w-md xl:max-w-sm">
          <PlaylistCard playlist={playlist} isEditAndDelete={true} />
          <div className="mt-6 flex items-center gap-x-3">
            <div className="h-16 w-16 shrink-0">
              <img
                src={playlist?.owner?.avatar.url}
                alt="React Patterns"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="w-full">
              <h6 className="font-semibold">{playlist?.owner?.fullName}</h6>
              <p className="text-sm text-gray-300">
                {playlist?.owner?.subscribers} Subscribers
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-y-4">
          {playlist?.videos &&
            playlist?.videos.map((video) => (
              <Link to={`/video/${video._id}`} key={video._id}>
                <NextVideoCard video={video} />
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Playlist;
