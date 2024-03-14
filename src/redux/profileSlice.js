import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    platforms: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    profileStart: (state) => {
      state.isFetching = true;
    },
    profileSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.user = action.payload.user;
    },
    platformFetchSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.platforms = action.payload.platforms;
    },

    profileFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    clearProfile: (state) => {
      state.isFetching = false;
      state.error = false;
      state.user = null;
      state.platforms = [];
    },
  },
});

export const {
  profileStart,
  profileFailure,
  profileSuccess,
  platformFetchSuccess,
  clearProfile,
} = profileSlice.actions;
export default profileSlice.reducer;
