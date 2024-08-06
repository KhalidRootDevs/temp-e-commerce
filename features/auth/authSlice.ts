import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null
  },
  reducers: {
    setCredentials: (state, action) => {
      // @ts-ignore

      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    userLogIn: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    userLogOut: (state, action): any => {
      state.user = null;
      state.token = null;
    }
  }
});

export const { userLogIn, userLogOut, setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: any) => state?.auth?.user;
export const selectCurrentToken = (state: any) => state?.auth?.token;
