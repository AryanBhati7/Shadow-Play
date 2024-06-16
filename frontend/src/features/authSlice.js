import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    authStatus: false,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.authStatus = true;
    },
    unSetCurrentUser: (state) => {
      state.currentUser = null;
      state.authStatus = false;
    },
  },
});

export const { setCurrentUser, unSetCurrentUser } = authSlice.actions;
export default authSlice.reducer;
