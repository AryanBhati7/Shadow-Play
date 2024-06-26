import React, { useEffect } from "react";
import { useVideos } from "../hooks/video.hook";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { Videocard, VideoCardSkeleton } from "../components/index.js";

function Home() {
  const { data, fetchNextPage, isFetched, isFetching } = useVideos();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isFetching) {
    return (
      <>
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
            {Array(8)
              .fill()
              .map((_, index) => (
                <VideoCardSkeleton key={index} />
              ))}
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
          {isFetched &&
            data?.pages.map((page, index) => {
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
          <div ref={ref}></div>
        </div>
      </section>
    </>
  );
}

export default Home;
