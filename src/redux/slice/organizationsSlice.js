import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiURL from "../../utils/apiURL";

// Initial state
const initialState = {
  organizations: [],
  loading: false,
  error: null,
};

// Async thunks
// Get all organizations
export const getOrganizations = createAsyncThunk(
  "organizations/getOrganizations",
  async () => {
    const response = await axios.get(apiURL.organizations.get);
    console.log("getOrganizations data: ", response.data);
    return response.data;
  }
);

// Post organization
export const postOrganization = createAsyncThunk(
  "organizations/postOrganization",
  async organization => {
    const response = await axios.post(apiURL.organizations.get, organization);
    console.log("postOrganization data: ", response.data);
    return response.data;
  }
);

// Put organization
export const putOrganization = createAsyncThunk(
  "organizations/putOrganization",
  async organization => {
    const response = await axios.put(apiURL.organizations.get, organization);
    console.log("putOrganization data: ", response.data);
    return response.data;
  }
);

// Delete organization
export const deleteOrganization = createAsyncThunk(
  "organizations/deleteOrganization",
  async organization => {
    const response = await axios.delete(apiURL.organizations.get, organization);
    console.log("deleteOrganization data: ", response.data);
    return response.data;
  }
);

// Slices
export const organizationsSlice = createSlice({
  name: "organizations",
  initialState,
  extraReducers: builder => {
    builder
      // Get all organizations
      .addCase(getOrganizations.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrganizations.fulfilled, (state, action) => {
        state.organizations = action.payload;
        state.loading = false;
      })
      .addCase(getOrganizations.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // Post organization
      .addCase(postOrganization.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postOrganization.fulfilled, (state, action) => {
        state.organizations = action.payload;
        state.loading = false;
      })
      .addCase(postOrganization.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // Put organization
      .addCase(putOrganization.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(putOrganization.fulfilled, (state, action) => {
        state.organizations = action.payload;
        state.loading = false;
      })
      .addCase(putOrganization.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // Delete organization
      .addCase(deleteOrganization.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.organizations = action.payload;
        state.loading = false;
      })
      .addCase(deleteOrganization.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

// Generate reducer
const organizationsReducer = organizationsSlice.reducer;

export default organizationsReducer;
