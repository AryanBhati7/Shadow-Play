import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Videocard from "../components/Videocard";
import { useVideos } from "../hooks/queries";
import { useInView } from "react-intersection-observer";

function Home() {
  const { data, fetchNextPage, isFetched } = useVideos();
  console.log(data);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
          {isFetched &&
            data?.pages.map((page) => {
              return (
                <React.Fragment key={page.page}>
                  {isFetched &&
                    page.docs.map((video) => {
                      return <Videocard key={video._id} video={video} />;
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
