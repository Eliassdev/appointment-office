import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const organizationsSlice = createApi({
  reducerPath: 'organizations',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    mode: 'cors',
  }),
  tagTypes: ['branches', 'branch'],
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
  }),
});

export const { useFetchOrganizationsQuery, useFetchOrganizationByIdQuery } =
  organizationsSlice;
