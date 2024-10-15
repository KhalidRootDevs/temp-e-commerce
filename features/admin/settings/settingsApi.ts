import { apiSlice } from '@/features/api/apiSlice';

const apiEndpoint: any = {
  create: '/admin/settings/create',
  edit: '/admin/settings',
  get: '/admin/settings',
  delete: '/admin/settings/delete',
  tag: 'settings'
};

const settingsApi = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === 'apply',
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: (queries: any) => {
        const values = Object.values(queries);
        if (values.length)
          return `${apiEndpoint.get}?${new URLSearchParams(queries)}`;
        return apiEndpoint.get;
      },
      providesTags: [apiEndpoint.tag]
    }),
    deleteSettings: builder.mutation({
      query: (id) => ({
        url: `${apiEndpoint.delete}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [apiEndpoint.tag]
    }),
    updateSettings: builder.mutation({
      query: (data) => ({
        url: `${apiEndpoint.edit}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: [apiEndpoint.tag]
    })
  })
});

export const {
  useGetSettingsQuery,
  useDeleteSettingsMutation,
  useUpdateSettingsMutation
} = settingsApi;

export default settingsApi;
