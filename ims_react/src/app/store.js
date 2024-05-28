import { configureStore } from '@reduxjs/toolkit'
import commonSlice  from './common'

export const store = configureStore({
  reducer: {
    common:commonSlice
  },
})