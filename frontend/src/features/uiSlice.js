import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sideBarFullSize: true,
  showUploadVideo: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSideBarFullSize: (state, action) => {
      state.sideBarFullSize = action.payload;
    },
    setShowUploadVideo: (state, action) => {
      state.showUploadVideo = action.payload;
    },
  },
});

export const { setSideBarFullSize, setShowUploadVideo } = uiSlice.actions;
export default uiSlice.reducer;
