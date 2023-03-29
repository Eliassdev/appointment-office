import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const organizationsSlice = createApi({
  reducerPath: 'organizations',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    mode: 'cors',
  }),
  tagTypes: ['branches', 'branch'],
  endpoints: (builder) => ({
    getOrganizations: builder.query({
      query(limit = 10) {
        return '/organizations';
      },
    }),
    getOrganizationById: builder.query({
      query(id) {
        return `/organizations/${id}`;
      },
    }),
  }),
});

export const { useGetOrganizationsQuery, useGetOrganizationByIdQuery } =
  organizationsSlice;
