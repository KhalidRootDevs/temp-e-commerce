import { apiSlice } from '../api/apiSlice';

export const authApi = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === 'apply',
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => {
        return {
          url: `admin/auth/signin`,
          method: 'POST',
          body: data
        };
      }
    }),
    getProfile: builder.query({
      query: (id) => `/user/${id}`,
      providesTags: ['userProfile']
    }),
    getOwnProfile: builder.mutation({
      query: () => '/admin/auth/me'
    }),
    updateAdminProfile: builder.mutation({
      query: ({ data }) => {
        return {
          url: `/admin/auth/me`,
          method: 'PUT',
          body: data
        };
      },
      invalidatesTags: ['userProfile']
    }),
    logoutUser: builder.mutation({
      query: () => {
        return {
          url: 'admin/auth/logout',
          method: 'POST'
        };
      },
      invalidatesTags: ['userProfile'],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          // dispatch(setValue({ target: "user", value: undefined }));
        } catch (err) {
          throw err;
        }
      }
    })
  })
});

export const {
  useGetProfileQuery,
  useAdminLoginMutation,
  useGetOwnProfileMutation,
  useLogoutUserMutation,
  useUpdateAdminProfileMutation
} = authApi;
