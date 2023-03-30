import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const serviceSlice = createApi({
  reducerPath: 'stylists',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    mode: 'cors',
  }),
  tagTypes: ['branches', 'branch'],
  endpoints: (builder) => ({
    fetchServices: builder.query({
      query(limit = 10) {
        return '/services';
      },
    }),
  }),
});

export const { useFetchServicesQuery } = serviceSlice;
