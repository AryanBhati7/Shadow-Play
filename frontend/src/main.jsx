import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
const App = lazy(() => import("./App.jsx"));
import { LoadingSpinner } from "./components/index.js";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Signup = lazy(() => import("./pages/Signup.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const VideoDetail = lazy(() => import("./pages/VideoDetail.jsx"));
const LikedVideos = lazy(() => import("./pages/LikedVideos.jsx"));
const MyChannel = lazy(() => import("./pages/MyChannel.jsx"));
const MyStudio = lazy(() => import("./pages/MyStudio.jsx"));
const Subscriptions = lazy(() => import("./pages/Subscriptions.jsx"));
const History = lazy(() => import("./pages/History.jsx"));
const ChannelPlaylist = lazy(() =>
  import("./pages/Channel/ChannelPlaylist.jsx")
);
const ChannelSubscribers = lazy(() =>
  import("./pages/Channel/ChannelSubscribers.jsx")
);
const ChannelVideos = lazy(() => import("./pages/Channel/ChannelVideos.jsx"));
const ChannelTweets = lazy(() => import("./pages/Channel/ChannelTweets.jsx"));
const ChannelAbout = lazy(() => import("./pages/Channel/ChannelAbout.jsx"));
const EditPersonalInfo = lazy(() =>
  import("./pages/EditProfile/EditPersonalInfo.jsx")
);
const EditChangePassword = lazy(() =>
  import("./pages/EditProfile/EditChangePassword.jsx")
);
const EditProfile = lazy(() => import("./pages/EditProfile.jsx"));
const EditChannelInfo = lazy(() =>
  import("./pages/EditProfile/EditChannelInfo.jsx")
);
const Support = lazy(() => import("./pages/Support.jsx"));
const Playlist = lazy(() => import("./pages/Playlist.jsx"));
const SearchVideos = lazy(() => import("./pages/SearchVideos.jsx"));
const Tweets = lazy(() => import("./pages/Tweets.jsx"));

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
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <AuthLayout auth={false}>
            <Suspense fallback={<LoadingSpinner />}>
              <Home />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/video/:videoId",
        element: (
          <AuthLayout auth={false}>
            <Suspense fallback={<LoadingSpinner />}>
              <VideoDetail />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/liked-videos",
        element: (
          <AuthLayout auth={true} pageName={"LikedVideos"}>
            <Suspense fallback={<LoadingSpinner />}>
              <LikedVideos />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/history",
        element: (
          <AuthLayout auth={true} pageName={"History"}>
            <Suspense fallback={<LoadingSpinner />}>
              <History />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/channel/:username",
        element: (
          <AuthLayout auth pageName={"MyChannel"}>
            <Suspense fallback={<LoadingSpinner />}>
              <MyChannel />
            </Suspense>
          </AuthLayout>
        ),
        children: [
          {
            path: "videos",
            element: (
              <AuthLayout auth>
                <Suspense fallback={<LoadingSpinner />}>
                  <ChannelVideos />
                </Suspense>
              </AuthLayout>
            ),
          },
          {
            path: "tweets",
            element: (
              <AuthLayout auth>
                <Suspense fallback={<LoadingSpinner />}>
                  <ChannelTweets />
                </Suspense>
              </AuthLayout>
            ),
          },
          {
            path: "playlist",
            element: (
              <AuthLayout auth>
                <Suspense fallback={<LoadingSpinner />}>
                  <ChannelPlaylist />
                </Suspense>
              </AuthLayout>
            ),
          },
          {
            path: "subscribers",
            element: (
              <AuthLayout auth>
                <Suspense fallback={<LoadingSpinner />}>
                  <ChannelSubscribers />
                </Suspense>
              </AuthLayout>
            ),
          },
          {
            path: "about",
            element: (
              <AuthLayout auth>
                <Suspense fallback={<LoadingSpinner />}>
                  <ChannelAbout />
                </Suspense>
              </AuthLayout>
            ),
          },
        ],
      },
      {
        path: "/my-studio",
        element: (
          <AuthLayout auth pageName={"MyStudio"}>
            <Suspense fallback={<LoadingSpinner />}>
              <MyStudio />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/subscriptions",
        element: (
          <AuthLayout auth pageName={"Subscriptions"}>
            <Suspense fallback={<LoadingSpinner />}>
              <Subscriptions />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/edit-profile",
        element: (
          <AuthLayout auth pageName={"Settings"}>
            <Suspense fallback={<LoadingSpinner />}>
              <EditProfile />
            </Suspense>
          </AuthLayout>
        ),
        children: [
          {
            path: "change-password",
            element: (
              <AuthLayout auth>
                <Suspense fallback={<LoadingSpinner />}>
                  <EditChangePassword />
                </Suspense>
              </AuthLayout>
            ),
          },
          {
            path: "channel-info",
            element: (
              <AuthLayout auth>
                <Suspense fallback={<LoadingSpinner />}>
                  <EditChannelInfo />
                </Suspense>
              </AuthLayout>
            ),
          },
          {
            path: "personal-info",
            element: (
              <AuthLayout auth>
                <Suspense fallback={<LoadingSpinner />}>
                  <EditPersonalInfo />
                </Suspense>
              </AuthLayout>
            ),
          },
        ],
      },
      {
        path: "/playlist/:playlistId",
        element: (
          <AuthLayout auth>
            <Suspense fallback={<LoadingSpinner />}>
              <Playlist />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/support",
        element: (
          <AuthLayout auth={false}>
            <Suspense fallback={<LoadingSpinner />}>
              <Support />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/search/:query",
        element: (
          <AuthLayout auth={false}>
            <Suspense fallback={<LoadingSpinner />}>
              <SearchVideos />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/tweets",
        element: (
          <AuthLayout auth={false}>
            <Suspense fallback={<LoadingSpinner />}>
              <Tweets />
            </Suspense>
          </AuthLayout>
        ),
      },
    ],
  },
  {
    path: "/signup",
    element: (
      <AuthLayout auth={false}>
        <Suspense fallback={<LoadingSpinner />}>
          <Signup />
        </Suspense>
      </AuthLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthLayout auth={false}>
        <Suspense fallback={<LoadingSpinner />}>
          <Login />
        </Suspense>
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
