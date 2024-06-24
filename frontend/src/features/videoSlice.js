import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  video: null,
  videoForEdit: null,
  videos: null,
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
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
  },
});

export const { setVideo, setVideoForEdit, setVideos } = videoSlice.actions;

export default videoSlice.reducer;
