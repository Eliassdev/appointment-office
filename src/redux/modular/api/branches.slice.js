import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const branchesSlice = createApi({
  reducerPath: 'branches',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    mode: 'cors',
  }),
  tagTypes: ['branches', 'branch'],
  endpoints: (builder) => ({
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
      providesTags: ['branch'],
      keepUnusedDataFor: 0,
    }),
    updateBranch: builder.mutation({
      query(input) {
        return {
          url: `/branches/${input.id}`,
          method: 'PATCH',
          body: input.info,
        };
      },
      invalidatesTags: ['branches', 'branch'],
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
  }),
});

export const {
  useCreateBranchMutation,
  useGetBranchesQuery,
  useGetBranchByIdQuery,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
} = branchesSlice;
