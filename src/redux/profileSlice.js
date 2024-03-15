import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    platforms: [],
    heatmaps: [],
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
    platformSetSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
    },
    platformsFetchSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.platforms = action.payload.platforms;
    },
    heatmapsFetchSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      console.log("huuu", action.payload.platforms);
      state.heatmaps = action.payload.platforms;
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
  platformSetSuccess,
  platformsFetchSuccess,
  heatmapsFetchSuccess,
  clearProfile,
} = profileSlice.actions;
export default profileSlice.reducer;
