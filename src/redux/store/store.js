import { configureStore } from "@reduxjs/toolkit";
import organizationsReducer from "../slice/organizationsSlice";
import { fetchOrganizations } from "../slice/organizationsSlice";

//Store

export const store = configureStore({
  reducer: {
    organizations: organizationsReducer,
  },
});

export default store;

store.dispatch(fetchOrganizations());
console.log(store.getState());
