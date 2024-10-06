import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null
  },
  reducers: {
    setCredentials: (state, action) => {
      // @ts-ignore
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
    },
    userLogIn: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
    },
    userLogOut: (state, action): any => {
      state.user = null;
      state.accessToken = null;
    }
  }
});

export const { userLogIn, userLogOut, setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: any) => state?.auth?.user;
export const selectCurrentToken = (state: any) => state?.auth?.accessToken;
