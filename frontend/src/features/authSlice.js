import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    authStatus: false,
  },
  reducers: {
    setUser: (state, action) => {
      if (!action.payload) {
        state.authStatus = false;
        state.user = null;
      } else {
        state.authStatus = true;
        state.user = action.payload;
      }
    },
  },
});

export const { setUser, unSetUser } = authSlice.actions;
export default authSlice.reducer;
