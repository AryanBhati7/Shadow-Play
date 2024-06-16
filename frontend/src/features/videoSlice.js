import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
  video: null,
  publishToggle: false,
  uploading: false,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    setVideo: (state, action) => {
      state.video = action.payload;
    },
    setPublishToggle: (state, action) => {
      state.publishToggle = action.payload;
    },
    setUploading: (state, action) => {
      state.uploading = action.payload;
    },
  },
});
