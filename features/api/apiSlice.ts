import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  prepareHeaders: async (headers) => {
    headers.set('x-api-key', process.env.NEXT_PUBLIC_API_KEY);
    headers.set('credentials', 'include');
    return headers;
  },
  credentials: 'include'
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: [
    'userProfile',
    'category',
    'product',
    'webCategory',
    'webProduct',
    'stripePay'
  ]
});
