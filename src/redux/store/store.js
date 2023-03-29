import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { organizationsSlice } from '../modular/api/organizations.slice';
import { branchesSlice } from '../modular/api/branches.slice';
import { stylistsSlice } from '../modular/api/stylists.slice';
import { serviceSlice } from '../modular/api/services.slice';

export const store = configureStore({
  reducer: {
    [organizationsSlice.reducerPath]: organizationsSlice.reducer,
    [branchesSlice.reducerPath]: branchesSlice.reducer,
    [stylistsSlice.reducerPath]: stylistsSlice.reducer,
    [serviceSlice.reducerPath]: serviceSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      branchesSlice.middleware,
      organizationsSlice.middleware,
      stylistsSlice.middleware,
      serviceSlice.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
