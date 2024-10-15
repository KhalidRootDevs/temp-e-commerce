import { apiSlice } from '@/features/api/apiSlice';

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => `/category/all`,
      providesTags: ['webCategory']
    }),
    categorySingle: builder.query({
      query: (id) => `/category/${id}`,
      providesTags: (result, error, id) => [{ type: 'webCategory', id }]
    })
  })
});

export const { useGetCategoryQuery, useCategorySingleQuery } = categoryApi;
export default categoryApi;
