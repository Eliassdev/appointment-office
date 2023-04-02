import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const serviceSlice = createApi({
  reducerPath: 'services',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    mode: 'cors',
  }),
  tagTypes: ['services', 'service'],
  endpoints: (builder) => ({
    getServices: builder.query({
      query(limit = 10) {
        return '/services';
      },
      providesTags: ['services'],
      keepUnusedDataFor: 0,
    }),
    getServiceById: builder.query({
      query(id) {
        return `/services/${id}`;
      },
      providesTags: ['service'],
      keepUnusedDataFor: 0,
    }),
    deleteService: builder.mutation({
      query(input) {
        return {
          url: `/services/${input.id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['services'],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useDeleteServiceMutation,
} = serviceSlice;
