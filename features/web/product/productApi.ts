import { apiSlice } from '@/features/api/apiSlice';

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (queries: any) => {
        if (queries && Object.keys(queries).length)
          return `/product/all?${new URLSearchParams(queries)}`;
        return `/product/all`;
      },
      providesTags: ['webProduct']
    })
  })
});

export const { useGetProductQuery } = productApi;
export default productApi;
