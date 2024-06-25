import React, { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useVideos } from "../hooks/video.hook";
import { VideolistCard, VideolistCardSkeleton } from "../components/index.js";
import { FaFilter } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";

function SearchVideos() {
  const { query } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);

  const sortBy = searchParams.get("sortBy") || "";
  const sortType = searchParams.get("sortType") || "";

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useVideos({ query, sortBy, sortType });

  const handleSortParams = (newSortBy, newSortType = "asc") => {
    setSearchParams({ sortBy: newSortBy, sortType: newSortType });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center gap-3 items-center w-full my-3">
        <VideolistCardSkeleton />
        <VideolistCardSkeleton />
        <VideolistCardSkeleton />
        <VideolistCardSkeleton />
        <VideolistCardSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex w-full justify-center items-center h-screen  text-white">
        <p className="text-xl">Error loading videos. Please try again later.</p>
      </div>
    );
  }

  const allVideos = data?.pages.flatMap((page) => page.docs) || [];

  if (allVideos.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-screen  text-white">
        <p className="text-xl">No videos found. Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className=" min-h-screen w-full">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">
            Search Results for "{query}"
          </h1>
          <button
            className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors duration-200"
            onClick={() => setFilterOpen((prev) => !prev)}
          >
            <span>Filters</span>
            <FaFilter size={16} />
          </button>
        </div>

        {filterOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 mt-7">
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">
                  Search filters
                </h2>
                <button onClick={() => setFilterOpen(false)}>
                  <IoCloseCircleOutline
                    size={24}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  />
                </button>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white border-b border-gray-700 pb-2">
                  Sort By
                </h3>
                <ul className="space-y-2">
                  {[
                    {
                      label: "Upload date (Latest)",
                      sortBy: "createdAt",
                      sortType: "desc",
                    },
                    {
                      label: "Upload date (Oldest)",
                      sortBy: "createdAt",
                      sortType: "asc",
                    },
                    {
                      label: "View count (Low to High)",
                      sortBy: "views",
                      sortType: "asc",
                    },
                    {
                      label: "View count (High to Low)",
                      sortBy: "views",
                      sortType: "desc",
                    },
                    {
                      label: "Duration (Low to High)",
                      sortBy: "duration",
                      sortType: "asc",
                    },
                    {
                      label: "Duration (High to Low)",
                      sortBy: "duration",
                      sortType: "desc",
                    },
                  ].map((item) => (
                    <li key={item.label}>
                      <button
                        className="text-gray-300 hover:text-purple-400 transition-colors duration-200 w-full text-left"
                        onClick={() => {
                          handleSortParams(item.sortBy, item.sortType);
                          setFilterOpen(false);
                        }}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {allVideos.map((video) => (
            <Link key={video?._id} to={`/video/${video?._id}`}>
              <VideolistCard video={video} />
            </Link>
          ))}
        </div>

        {hasNextPage && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200 disabled:opacity-50"
            >
              {isFetchingNextPage ? "Loading more..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchVideos;
