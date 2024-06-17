import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/authSlice";
import uiSlice from "../features/uiSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
  },
});

export default store;
