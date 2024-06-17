import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/authSlice";
import uiSlice from "../features/uiSlice";
import videoSlice from "../features/videoSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    video: videoSlice,
  },
});

export default store;
