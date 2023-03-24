import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const organizationsSlice = createApi({
  reducerPath: 'organizations',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    mode: 'cors',
  }),
  tagTypes: ['branches'],
  endpoints: (builder) => ({
    fetchOrganizations: builder.query({
      query(limit = 10) {
        return '/organizations';
      },
    }),
    fetchOrganizationById: builder.query({
      query(id) {
        return `/organizations/${id}`;
      },
    }),
    getBranches: builder.query({
      query(limit = 10) {
        return '/branches';
      },
      providesTags: ['branches'],
      keepUnusedDataFor: 0,
    }),
    getBranchById: builder.query({
      query(id) {
        return `/branches/${id}`;
      },
    }),
    createBranch: builder.mutation({
      query(input) {
        return {
          url: '/branches/',
          method: 'POST',
          body: input,
        };
      },
      invalidatesTags: ['branches'],
    }),
    updateBranch: builder.mutation({
      query(input) {
        return {
          url: `/branches/${input.id}`,
          method: 'PATCH',
          body: input.info,
        };
      },
      invalidatesTags: ['branches'],
    }),
    deleteBranch: builder.mutation({
      query(input) {
        return {
          url: `/branches/${input.id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['branches'],
    }),
    fetchStylist: builder.query({
      query(limit = 10) {
        return '/stylists';
      },
    }),
    fetchServices: builder.query({
      query(limit = 10) {
        return '/services';
      },
    }),
  }),
});

export const {
  useFetchStylistQuery,
  useFetchOrganizationByIdQuery,
  useGetBranchesQuery,
  useCreateBranchMutation,
  useDeleteBranchMutation,
  useGetBranchByIdQuery,
  useUpdateBranchMutation,
} = organizationsSlice;
