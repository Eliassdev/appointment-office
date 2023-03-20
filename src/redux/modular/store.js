import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { organizationsSlice } from './api/orgSlice';

const store = configureStore({
  reducer: {
    [organizationsSlice.reducerPath]: organizationsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(organizationsSlice.middleware),
});

setupListeners(store.dispatch);

export default store;
