import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginPopup } from "./index.js";

function AuthLayout({ auth, children }) {
  const authStatus = useSelector((state) => state.auth.status);
  let authentication;
  useEffect(() => {
    if (authStatus === auth) {
      authentication = true;
    } else {
      authentication = false;
    }
  }, [authStatus, auth]);

  return <>{authentication ? <LoginPopup /> : <>{children} </>}</>;
}

export default AuthLayout;
