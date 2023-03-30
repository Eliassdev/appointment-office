import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const stylistsSlice = createApi({
  reducerPath: 'stylists',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    mode: 'cors',
  }),
  tagTypes: ['branches', 'branch'],
  endpoints: (builder) => ({
    getStylist: builder.query({
      query(limit = 10) {
        return '/stylists';
      },
    }),
  }),
});

export const { useGetStylistQuery } = stylistsSlice;
