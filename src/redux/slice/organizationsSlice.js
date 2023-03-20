import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiURL from "../../utils/apiURL";
import axios from "axios";

// Initial state
const initialState = {
  posts: [],
  loading: false,
  error: null,
};

// Async thunk
export const fetchOrganizations = createAsyncThunk(
  "organizations/fetchOrganizations",
  async () => {
    const response = await axios.get(apiURL);
    return response.data;
  }
);

// Slice

export const organizationsSlice = createSlice({
  name: "organizations",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchOrganizations.pending, state => {
        state.loading = true;
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.organizations = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

// Generate reducer
const postsReducer = postsSlice.reducer;

export default postsReducer;
