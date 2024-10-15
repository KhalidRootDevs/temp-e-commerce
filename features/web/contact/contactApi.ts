import { apiSlice } from '@/features/api/apiSlice';

const apiEndpoint: any = {
  create: '/contact',
  tag: 'contact'
};

const productApi = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === 'apply',
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (data) => ({
        url: apiEndpoint.create,
        method: 'POST',
        body: data
      }),
      invalidatesTags: [apiEndpoint.tag]
    })
  })
});

export const { useCreateContactMutation } = productApi;

export default productApi;
