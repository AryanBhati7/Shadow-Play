import React, { useEffect, useState } from "react";
import { Header, LoadingSpinner } from "./components/index.js";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useCurrentUser } from "./hooks/auth.hook.js";
import { setUser } from "./features/authSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { data: userData, isFetching, error } = useCurrentUser();
  const user = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!isFetching) {
      if (userData && !user) {
        dispatch(setUser(userData));
      }
      setIsLoading(false);
    }
  }, [userData, isFetching, dispatch, user]);

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  if (error) {
    // Handle error state
    console.error("Error fetching user data:", error);
    // You might want to render an error component here
  }

  return (
    <div className="h-screen overflow-y-auto bg-[#121212] text-white">
      <Header />
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
