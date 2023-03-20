import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { organizationsSlice } from '../modular/api/orgSlice';
import organizationsReducer from '../slice/organizationsSlice';

//Store
export const store = configureStore({
  reducer: {
    organizations: organizationsReducer,
    [organizationsSlice.reducerPath]: organizationsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(organizationsSlice.middleware),
});

setupListeners(store.dispatch);

export default store;
