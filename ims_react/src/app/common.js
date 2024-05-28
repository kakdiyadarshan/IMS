import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: !!sessionStorage.getItem("login"),
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsLogin: (state,action) => {
      console.log(action.payload)
      state.isLogin = action.payload
  
  },
}
})

// Action creators are generated for each case reducer function
export const { setIsLogin } = commonSlice.actions

export default commonSlice.reducer