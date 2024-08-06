import { apiSlice } from '@/features/api/apiSlice';

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => `/product/all`,
      providesTags: ['webProduct']
    })
  })
});

export const { useGetProductQuery } = productApi;
export default productApi;
