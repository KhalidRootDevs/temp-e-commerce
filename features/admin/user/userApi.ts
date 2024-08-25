import { apiSlice } from '@/features/api/apiSlice';

const apiEndpoint: any = {
  create: '/user/create',
  edit: '/user/update',
  getAll: '/user/all',
  delete: '/user/delete',
  getById: '/user',
  tag: 'userProfile'
};

const userApi = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === 'apply',
  endpoints: (builder) => ({
    createApi: builder.mutation({
      query: (data) => ({
        url: apiEndpoint.create,
        method: 'POST',
        body: data
      }),
      invalidatesTags: [apiEndpoint.tag]
    }),
    getAllApi: builder.query({
      query: (queries: any) => {
        const values = Object.values(queries);
        if (values.length)
          return `${apiEndpoint.getAll}?${new URLSearchParams(queries)}`;
        return apiEndpoint.getAll;
      },
      providesTags: [apiEndpoint.tag]
    }),

    getByIdApi: builder.query({
      query: (id) => `${apiEndpoint.getById}/${id}`,
      providesTags: (result, error, id) => [{ type: apiEndpoint.tag, id }]
    }),
    deleteApi: builder.mutation({
      query: (id) => ({
        url: `${apiEndpoint.delete}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [apiEndpoint.tag]
    }),
    updateApi: builder.mutation({
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
  useCreateApiMutation,
  useGetAllApiQuery,
  useGetByIdApiQuery,
  useDeleteApiMutation,
  useUpdateApiMutation
} = userApi;

export default userApi;
