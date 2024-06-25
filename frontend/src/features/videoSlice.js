import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  video: null,
  videoForEdit: null,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideo: (state, action) => {
      state.video = action.payload;
    },
    setVideoForEdit: (state, action) => {
      state.videoForEdit = action.payload;
    },
  },
});

export const { setVideo, setVideoForEdit } = videoSlice.actions;

export default videoSlice.reducer;
