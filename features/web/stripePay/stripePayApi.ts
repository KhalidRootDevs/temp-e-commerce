import { apiSlice } from "@/features/api/apiSlice";

export const stripePayApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (data) => ({
        url: `/stripe/payment/intent`,
        method: "POST",
        body: data,
      }),
      providesTags: ["stripePay"],
    }),
  }),
});

export const { useGetProductQuery } = stripePayApi;
export default stripePayApi;
