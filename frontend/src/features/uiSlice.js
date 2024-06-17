import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sideBarFullSize: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSideBarFullSize: (state, action) => {
      state.sideBarFullSize = action.payload;
    },
  },
});

export const { setSideBarFullSize } = uiSlice.actions;
export default uiSlice.reducer;
