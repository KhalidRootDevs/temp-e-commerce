import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authSlice from './auth/authSlice';
import { cartReducer } from './cart/cart.slice';

const store = configureStore({
  reducer: {
    // @ts-ignore
    [apiSlice.reducerPath]: apiSlice.reducer,
    authStore: authSlice,
    cart: cartReducer
  },
  // @ts-ignore
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
  devTools: process.env.NEXT_PUBLIC_NODE_ENV !== 'production'
});

export default store;
