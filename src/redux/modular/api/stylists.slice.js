import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const stylistsSlice = createApi({
  reducerPath: 'stylists',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    mode: 'cors',
  }),
  tagTypes: ['stylists', 'stylist'],
  endpoints: (builder) => ({
    getStylist: builder.query({
      query(limit = 10) {
        return '/stylists';
      },
      providesTags: ['stylists'],
      keepUnusedDataFor: 0,
    }),
    getStylistById: builder.query({
      query(id) {
        return `/stylists/${id}`;
      },
      providesTags: ['stylist'],
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetStylistQuery, useGetStylistByIdQuery } = stylistsSlice;
