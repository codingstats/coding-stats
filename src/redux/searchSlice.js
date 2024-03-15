import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    user: null,
    platforms: [],
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
    platformFetchSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.platforms = action.payload.platforms;
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
    },
  },
});

export const {
  searchStart,
  searchFailure,
  searchSuccess,
  platformSetSuccess,
  platformFetchSuccess,
  clearsearch,
} = searchSlice.actions;
export default searchSlice.reducer;
