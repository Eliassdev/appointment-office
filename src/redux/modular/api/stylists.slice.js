import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const stylistsSlice = createApi({
  reducerPath: 'stylists',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    mode: 'cors',
  }),
  tagTypes: ['stylists', 'stylist'],
  endpoints: (builder) => ({
    createStylist: builder.mutation({
      query(input) {
        return {
          url: '/stylists/',
          method: 'POST',
          body: input,
        };
      },
      invalidatesTags: ['stylists'],
    }),
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
    updateStylist: builder.mutation({
      query(input) {
        return {
          url: `/stylists/${input.id}`,
          method: 'PATCH',
          body: input.info,
        };
      },
      invalidatesTags: ['stylists', 'stylist'],
    }),
    deleteStylist: builder.mutation({
      query(input) {
        return {
          url: `/stylists/${input.id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['stylists'],
    }),
  }),
});

export const {
  useCreateStylistMutation,
  useGetStylistQuery,
  useGetStylistByIdQuery,
  useUpdateStylistMutation,
  useDeleteStylistMutation,
} = stylistsSlice;
