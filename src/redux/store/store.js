import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../slice/organizationsSlice";

//Store

export const store = configureStore({
  reducer: {
    organizations: organizationsReducer,
  },
});

export default store;
