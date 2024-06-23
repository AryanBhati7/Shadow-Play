import { createSlice } from "@reduxjs/toolkit";

const channelSlice = createSlice({
  name: "channel",
  initialState: {
    channel: null,
  },
  reducers: {
    setChannel: (state, action) => {
      state.channel = action.payload;
    },
  },
});

export const { setChannel } = channelSlice.actions;
export default channelSlice.reducer;
