import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { branchesSlice } from '../modular/api/branches.slice';

export const store = configureStore({
  reducer: {
    [branchesSlice.reducerPath]: branchesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(branchesSlice.middleware),
});

setupListeners(store.dispatch);

export default store;
