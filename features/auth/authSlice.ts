import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null
  },
  reducers: {
    setValue: (state, action) => {
      // @ts-ignore
      state[action.payload.target] = action.payload.value;
    },
    userLoggedIn: (state, action) => {
      state.user = action.payload;
    },
    userLoggedOut: (state, action) => {
      state.user = action.payload.value;
    }
  }
});

export const { userLoggedIn, userLoggedOut, setValue } = authSlice.actions;

export default authSlice;
