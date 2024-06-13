import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signup, Home } from "./pages/index.js";
import LayoutController from "./components/LayoutController.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <LayoutController authStatus>
            <Home />
          </LayoutController>
        ),
      },
      {
        path: "/signup",
        element: (
          <LayoutController authStatus={false} sidebar={false}>
            <Signup />
          </LayoutController>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
