import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

export const selectedVideoSlice = createSlice({
  name: "selectedVideo",
  initialState,
  reducers: {
    selectVideo: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { selectVideo } = selectedVideoSlice.actions;

export default selectedVideoSlice.reducer;
