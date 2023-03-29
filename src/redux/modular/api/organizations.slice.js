import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const organizationsSlice = createApi({
  reducerPath: 'organizations',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    mode: 'cors',
  }),
  tagTypes: ['organizations', 'organization'],
  endpoints: (builder) => ({
    createOrganization: builder.mutation({
      query(input) {
        return {
          url: '/organizations/',
          method: 'POST',
          body: input,
        };
      },
      invalidatesTags: ['organizations'],
    }),
    getOrganizations: builder.query({
      query(limit = 10) {
        return '/organizations';
      },
      providesTags: ['organizations'],
      keepUnusedDataFor: 0,
    }),
    getOrganizationById: builder.query({
      query(id) {
        return `/organizations/${id}`;
      },

      providesTags: ['organization'],
      keepUnusedDataFor: 0,
    }),
    updateOrganization: builder.mutation({
      query(input) {
        return {
          url: `/branches/${input.id}`,
          method: 'PATCH',
          body: input.info,
        };
      },
      invalidatesTags: ['branches', 'branch'],
    }),
    deleteOrganization: builder.mutation({
      query(input) {
        return {
          url: `/branches/${input.id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['branches'],
    }),
  }),
});

export const {
  useCreateOrganizationMutation,
  useGetOrganizationsQuery,
  useGetOrganizationByIdQuery,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
} = organizationsSlice;
