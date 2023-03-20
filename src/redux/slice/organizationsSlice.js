import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import apiURL from '../../utils/apiURL';

// Initial state
const initialState = {
  organizations: [],
  loading: false,
  error: null,
};

// Async thunk
export const fetchOrganizations = createAsyncThunk(
  'organizations/fetchOrganizations',
  async () => {
    const response = await axios.get(apiURL);
    return response.data;
  }
);

// Slice

export const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizations.pending, (state) => {
        state.loading = true;
        //Micro correccion: Siempre que esta"Pending" aprovechamos para limpiar los errores que pueden haberse generado en los fetchs
        state.error = null;
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
const organizationsReducer = organizationsSlice.reducer;

export default organizationsReducer;
