import { apiSlice } from '@/features/api/apiSlice';

const apiEndpoint: any = {
  create: '/admin/category/create',
  edit: '/admin/category',
  getAll: '/admin/category/all',
  delete: '/admin/category',
  getById: '/admin/category',
  tag: 'category'
};

const categoryApi = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === 'apply',
  endpoints: (builder) => ({
    categoryCreateApi: builder.mutation({
      query: (data) => ({
        url: apiEndpoint.create,
        method: 'POST',
        body: data
      }),
      invalidatesTags: [apiEndpoint.tag]
    }),
    categoryGetAllApi: builder.query({
      query: (queries: any) => {
        const values = Object.values(queries);
        if (values.length)
          return `${apiEndpoint.getAll}?${new URLSearchParams(queries)}`;
        return apiEndpoint.getAll;
      },
      providesTags: [apiEndpoint.tag]
    }),

    categoryGetByIdApi: builder.query({
      query: (id) => `${apiEndpoint.getById}/${id}`,
      providesTags: (result, error, id) => [{ type: apiEndpoint.tag, id }]
    }),
    categoryDeleteApi: builder.mutation({
      query: (id) => ({
        url: `${apiEndpoint.delete}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [apiEndpoint.tag]
    }),
    categoryUpdateApi: builder.mutation({
      query: ({ id, data }) => ({
        url: `${apiEndpoint.edit}/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: [apiEndpoint.tag]
    })
  })
});

export const {
  useCategoryCreateApiMutation,
  useCategoryGetAllApiQuery,
  useCategoryGetByIdApiQuery,
  useCategoryDeleteApiMutation,
  useCategoryUpdateApiMutation
} = categoryApi;

export default categoryApi;
