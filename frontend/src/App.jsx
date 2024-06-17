import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useCurrentUser } from "./hooks/queries.js";
import { setUser } from "./features/authSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.authStatus);

  const { data: userData } = useCurrentUser();
  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData));
    }
  }, [userData]);

  return (
    <>
      <div className="h-screen overflow-y-auto bg-[#121212] text-white">
        <Header />
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
// {/* <ReactQueryDevtools initialIsOpen={false} /> */}
