import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LoginPopup } from "./index.js";

function AuthLayout({ auth, children }) {
  const authStatus = useSelector((state) => state.auth.authStatus);

  if (auth && authStatus) {
    return children;
  }
  if (auth && !authStatus) {
    return <LoginPopup />;
  }
  return children;
}

export default AuthLayout;
