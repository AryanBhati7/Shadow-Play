import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/authSlice";
import uiSlice from "../features/uiSlice";
import videoSlice from "../features/videoSlice";
import channelSlice from "../features/channelSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    video: videoSlice,
    channel: channelSlice,
  },
  devTools: false,
});

export default store;
