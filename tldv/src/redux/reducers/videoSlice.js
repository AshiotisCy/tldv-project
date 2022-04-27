import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      attributes: {
        slug: "",
        title: "",
        isPublic: true,
        url: "",
      },
      id: 0,
    },
  ],
};

export const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setVideosList: (state, action) => {
      state.data = action.payload;
    },
    updatedVideoList: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setVideosList, updatedVideoList } = videoSlice.actions;

export default videoSlice.reducer;