import React from "react";
import Sidebar from "../components/Sidebar";
import Videocard from "../components/Videocard";

function Home() {
  return (
    <>
      <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
          <Videocard />
        </div>
      </section>
    </>
  );
}

export default Home;
