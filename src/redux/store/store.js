import { configureStore } from "@reduxjs/toolkit";
import organizationsReducer from "../slice/organizationsSlice";

//Store
export const store = configureStore({
  reducer: {
    organizations: organizationsReducer,
  },
});

export default store;
