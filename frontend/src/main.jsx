import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Signup,
  Home,
  Login,
  VideoDetail,
  LikedVideos,
  MyChannel,
  MyStudio,
  Subscriptions,
  History,
  ChannelPlaylist,
  ChannelSubscribers,
  ChannelVideos,
  ChannelTweets,
  EditPersonalInfo,
  EditChangePassword,
  EditProfile,
  EditChannelInfo,
  Support,
  Playlist,
  SearchVideos,
} from "./pages/index.js";
import AuthLayout from "./components/AuthLayout.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (import.meta.env.MODE === "production") disableReactDevTools();

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout auth={false}>
            <Home />
          </AuthLayout>
        ),
      },
      {
        path: "/video/:videoId",
        element: (
          <AuthLayout auth={false}>
            <VideoDetail />
          </AuthLayout>
        ),
      },
      {
        path: "/liked-videos",
        element: (
          <AuthLayout auth={true} pageName={"LikedVideos"}>
            <LikedVideos />
          </AuthLayout>
        ),
      },
      {
        path: "/history",
        element: (
          <AuthLayout auth={true} pageName={"History"}>
            <History />
          </AuthLayout>
        ),
      },
      {
        path: "/channel/:username",
        element: (
          <AuthLayout auth pageName={"MyChannel"}>
            <MyChannel />
          </AuthLayout>
        ),
        children: [
          {
            path: "videos",
            element: (
              <AuthLayout auth>
                <ChannelVideos />
              </AuthLayout>
            ),
          },
          {
            path: "tweets",
            element: (
              <AuthLayout auth>
                <ChannelTweets />
              </AuthLayout>
            ),
          },
          {
            path: "playlist",
            element: (
              <AuthLayout auth>
                <ChannelPlaylist />
              </AuthLayout>
            ),
          },
          {
            path: "subscribers",
            element: (
              <AuthLayout auth>
                <ChannelSubscribers />
              </AuthLayout>
            ),
          },
        ],
      },
      {
        path: "/my-studio",
        element: (
          <AuthLayout auth pageName={"MyStudio"}>
            <MyStudio />
          </AuthLayout>
        ),
      },
      {
        path: "/subscriptions",
        element: (
          <AuthLayout auth pageName={"Subscriptions"}>
            <Subscriptions />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-profile",
        element: (
          <AuthLayout auth pageName={"Settings"}>
            <EditProfile />
          </AuthLayout>
        ),
        children: [
          {
            path: "change-password",
            element: (
              <AuthLayout auth>
                <EditChangePassword />
              </AuthLayout>
            ),
          },
          {
            path: "channel-info",
            element: (
              <AuthLayout auth>
                <EditChannelInfo />
              </AuthLayout>
            ),
          },
          {
            path: "personal-info",
            element: (
              <AuthLayout auth>
                <EditPersonalInfo />
              </AuthLayout>
            ),
          },
        ],
      },
      {
        path: "/playlist/:playlistId",
        element: (
          <AuthLayout auth>
            <Playlist />
          </AuthLayout>
        ),
      },
      {
        path: "/support",
        element: (
          <AuthLayout auth={false}>
            <Support />
          </AuthLayout>
        ),
      },
      {
        path: "/search/:query",
        element: (
          <AuthLayout auth={false}>
            <SearchVideos />
          </AuthLayout>
        ),
      },
    ],
  },
  {
    path: "/signup",
    element: (
      <AuthLayout auth={false}>
        <Signup />
      </AuthLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthLayout auth={false}>
        <Login />
      </AuthLayout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    {import.meta.env.MODE === "development" && (
      <ReactQueryDevtools initialIsOpen={false} />
    )}
    <Toaster
      position="bottom-right"
      reverseOrder={true}
      toastOptions={{
        error: {
          style: { borderRadius: "0", color: "red" },
        },
        success: {
          style: { borderRadius: "0", color: "green" },
        },
        duration: 2000,
      }}
    />
  </QueryClientProvider>
  // </React.StrictMode>
);
