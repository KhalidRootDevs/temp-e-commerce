import { apiSlice } from '@/features/api/apiSlice';

export const stripePayApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (data) => ({
        url: `/stripe/payment/intent`,
        method: 'POST',
        body: data
      }),
      providesTags: ['stripePay']
    }),
    createPayment: builder.mutation({
      query: (data) => ({
        url: `/stripe/store-intent`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['stripePay']
    })
  })
});

export const { useGetProductQuery, useCreatePaymentMutation } = stripePayApi;
export default stripePayApi;
