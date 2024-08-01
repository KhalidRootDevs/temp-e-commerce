import { auth } from '@/auth';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  // @ts-ignore
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  prepareHeaders: async (headers) => {
    const session = await auth();

    if (session?.user) {
      headers.set('Authorization', `Bearer ${session.user.accessToken}`);
    }

    headers.set(
      'x-api-key',
      process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY || ''
    );
    headers.set('credentials', 'include');
    return headers;
  },
  credentials: 'include'
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
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
