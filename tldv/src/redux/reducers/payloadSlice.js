import { createSlice } from "@reduxjs/toolkit";

const payloadInitialState = {
  data: {},
};

export const payloadSlice = createSlice({
  name: "payload",
  initialState: payloadInitialState,
  reducers: {
    setPayloadSlice: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setPayloadSlice } = payloadSlice.actions;

export default payloadSlice.reducer;
