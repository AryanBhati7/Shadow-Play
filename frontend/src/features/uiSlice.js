import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sideBarFullSize: true,
  showUploadVideo: false,
  showEditVideo: false,
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
    setShowEditVideo: (state, action) => {
      state.showEditVideo = action.payload;
    },
  },
});

export const { setSideBarFullSize, setShowUploadVideo, setShowEditVideo } =
  uiSlice.actions;
export default uiSlice.reducer;
