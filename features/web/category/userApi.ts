import { apiSlice } from "@/features/api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => `/category/all`,
      providesTags: ["webCategory"],
    }),
    categoryProduct: builder.query({
      query: (id) => `/product/all?category=${id}`,
      providesTags: (result, error, id) => [{ type: "webCategory", id }],
    }),
  }),
});

export const { useGetCategoryQuery, useCategoryProductQuery } = categoryApi;
export default categoryApi;
