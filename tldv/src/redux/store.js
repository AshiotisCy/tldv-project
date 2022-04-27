import { configureStore } from '@reduxjs/toolkit'
import payloadSlice from './reducers/payloadSlice'
import videoSlice from './reducers/videoSlice'
import selectedVideoSlice from './reducers/selectedVideoSlice'

export const store = configureStore({
  reducer: {
    videos: videoSlice,
    payload: payloadSlice,
    selectedVideo: selectedVideoSlice

  },
})