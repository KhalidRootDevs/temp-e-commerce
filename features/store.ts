import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authSlice from './auth/authSlice';
import { cartReducer } from './cart/cart.slice';
// import gallerySlice from './gallery/gallerySlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,

    [apiSlice.reducerPath]: apiSlice.reducer,
    authStore: authSlice
    // galleryStore: gallerySlice,
  },
  devTools: process.env.NEXT_PUBLIC_NODE_ENV !== 'production',
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware)
});

export default store;
