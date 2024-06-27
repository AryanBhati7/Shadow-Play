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

  const { data: playlist, isFetching, isFetched } = usePlaylistById(playlistId);

  if (isFetching) {
    return <PlaylistSkeleton />;
  }
  console.log(playlist);

  if (isFetched && playlist.length === 0) {
    return (
      <div className="flex justify-center p-4">
        <div className="w-full max-w-sm text-center">
          <p className="mb-3 w-full">
            <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
              <span className="inline-block w-6">
                <svg
                  style={{ width: "100%" }}
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 5L10.8845 2.76892C10.5634 2.1268 10.4029 1.80573 10.1634 1.57116C9.95158 1.36373 9.69632 1.20597 9.41607 1.10931C9.09916 1 8.74021 1 8.02229 1H4.2C3.0799 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.0799 1 4.2V5M1 5H16.2C17.8802 5 18.7202 5 19.362 5.32698C19.9265 5.6146 20.3854 6.07354 20.673 6.63803C21 7.27976 21 8.11984 21 9.8V14.2C21 15.8802 21 16.7202 20.673 17.362C20.3854 17.9265 19.9265 18.3854 19.362 18.673C18.7202 19 17.8802 19 16.2 19H5.8C4.11984 19 3.27976 19 2.63803 18.673C2.07354 18.3854 1
  .6146 17.9265 1.32698 17.362C1 16.7202 1 15.8802 1 14.2V5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokelinejoin="round"
                  ></path>
                </svg>
              </span>
            </span>
          </p>
          <h5 className="mb-2 font-semibold">No video in playlist</h5>
          <p>There are no video in this playlist.</p>
        </div>
      </div>
    );
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
            playlist?.videos?.map((video) => (
              <Link to={`/video/${video._id}`} key={video?._id}>
                <NextVideoCard video={video} owner={playlist.owner} />
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Playlist;
