import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectCurrentToken } from '../auth/authSlice';

const API_KEY = process.env.BACKEND_TOKEN || process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: async (headers, { getState }) => {
    const token = selectCurrentToken(getState());

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    headers.set('x-api-key', API_KEY!);
    headers.set('credentials', 'include');

    return headers;
  }
});

const baseQueryWithAuth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
  tagTypes: [
    'userProfile',
    'category',
    'product',
    'webCategory',
    'webProduct',
    'stripePay',
    'settings',
    'contact'
  ]
});
