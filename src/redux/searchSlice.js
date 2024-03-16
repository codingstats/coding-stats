import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    user: null,
    platforms: [],
    heatmaps: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    searchStart: (state) => {
      state.isFetching = true;
    },
    searchSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.user = action.payload.user;
    },
    platformsFetchSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.platforms = action.payload.platforms;
    },
    heatmapsFetchSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.heatmaps = action.payload.platforms;
    },
    searchFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    clearsearch: (state) => {
      state.isFetching = false;
      state.error = false;
      state.user = null;
      state.platforms = [];
      state.heatmaps = [];
    },
  },
});

export const {
  searchStart,
  searchFailure,
  searchSuccess,
  platformSetSuccess,
  platformsFetchSuccess,
  heatmapsFetchSuccess,
  clearsearch,
} = searchSlice.actions;
export default searchSlice.reducer;
