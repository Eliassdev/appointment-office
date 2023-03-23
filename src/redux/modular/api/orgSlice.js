import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const organizationsSlice = createApi({
  reducerPath: 'organizations',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
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
    fetchBranches: builder.query({
      query(limit = 10) {
        return '/branches';
      },
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

export const { useFetchStylistQuery, useFetchOrganizationByIdQuery } =
  organizationsSlice;
