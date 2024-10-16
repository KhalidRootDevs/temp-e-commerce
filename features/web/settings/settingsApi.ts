import { apiSlice } from '@/features/api/apiSlice';

// Define the endpoint for fetching web settings
const apiEndpoint: any = {
  get: '/settings',
  tag: 'webSettings'
};

const webSettingsApi = apiSlice.injectEndpoints({
  // Hot Module Replacement for development
  // @ts-ignore
  overrideExisting: module.hot?.status() === 'apply',
  endpoints: (builder) => ({
    // Fetch web settings (with optional query params)
    getWebSettings: builder.query({
      query: (queries: any) => {
        const values = Object.values(queries);
        if (values.length)
          return `${apiEndpoint.get}?${new URLSearchParams(queries)}`;
        return apiEndpoint.get;
      },
      providesTags: [apiEndpoint.tag]
    })
  })
});

// Export the hook for fetching web settings
export const { useGetWebSettingsQuery } = webSettingsApi;

export default webSettingsApi;
