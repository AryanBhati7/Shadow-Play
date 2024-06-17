import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signup, Home, Login, VideoDetail } from "./pages/index.js";
import AuthLayout from "./components/AuthLayout.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
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
          <AuthLayout auth={true}>
            <VideoDetail />
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
    <ReactQueryDevtools initialIsOpen={false} />
    <Toaster
      position="top-right"
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
