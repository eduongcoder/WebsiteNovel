import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for API
const BASE_URL = 'http://26.232.136.42:8080/api/pov';

// Thunk to fetch POV data
export const fetchPov = createAsyncThunk(
    'pov/fetchPov',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/getAllPOV`);
            return response.data.result || [];
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch POV data');
        }
    }
);

// Thunk to delete a POV
export const deletePov = createAsyncThunk(
    'pov/deletePov',
    async (povId, { rejectWithValue }) => {
        try {
            await axios.delete(`${BASE_URL}/deletePOV?idPOV=${povId}`);
            return povId;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to delete POV');
        }
    }
);

// Thunk to create a new POV
export const createPov = createAsyncThunk(
    'pov/createPov',
    async (newPov, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/createPOV`, newPov,{
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data.result;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to create POV');
        }
    }
);

// Thunk to update a POV
export const updatePov = createAsyncThunk(
    'pov/updatePov',
    async ({ povId, updatedPov }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL}/updatePOV/${povId}`, updatedPov);
            return response.data.result;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to update POV');
        }
    }
);

// Slice for POV data
const povSlice = createSlice({
    name: 'pov',
    initialState: {
        pov: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch POV pending state
            .addCase(fetchPov.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error when loading begins
            })
            // Fetch POV fulfilled state
            .addCase(fetchPov.fulfilled, (state, action) => {
                state.loading = false;
                state.pov = action.payload;
            })
            // Fetch POV rejected state
            .addCase(fetchPov.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error loading data'; // Use action.payload for better error tracking
            })
            // Delete POV fulfilled state
            .addCase(deletePov.fulfilled, (state, action) => {
                state.pov = state.pov.filter((pov) => pov.idPov !== action.payload);
            })
            // Delete POV rejected state
            .addCase(deletePov.rejected, (state, action) => {
                state.error = action.payload || 'Failed to delete POV';
            })
            // Create POV fulfilled state
            .addCase(createPov.fulfilled, (state, action) => {
                state.pov.push(action.payload);
            })
            // Create POV rejected state
            .addCase(createPov.rejected, (state, action) => {
                state.error = action.payload || 'Failed to create POV';
            })
            // Update POV fulfilled state
            .addCase(updatePov.fulfilled, (state, action) => {
                const index = state.pov.findIndex((pov) => pov.idPov === action.payload.idPov);
                if (index !== -1) {
                    state.pov[index] = action.payload;
                }
            })
            // Update POV rejected state
            .addCase(updatePov.rejected, (state, action) => {
                state.error = action.payload || 'Failed to update POV';
            });
    },
});

export default povSlice.reducer;
