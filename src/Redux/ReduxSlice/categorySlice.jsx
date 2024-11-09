import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for API
const BASE_URL = 'http://26.232.136.42:8080/api/category';

// Thunk to fetch all categories
export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/getAllCategory`);
      return response.data.result || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch categories');
    }
  }
);

// Thunk to delete a category
export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/deleteCategory?idCategory=${categoryId}`);
      return categoryId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete category');
    }
  }
);

// Thunk to create a new category
export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (newCategory, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/createCategory`, newCategory, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create category');
    }
  }
);

// Thunk to update a category
export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async ({ id, updatedCategory }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/updateCategory/${id}`, updatedCategory);
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update category');
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load data';
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.idCategory !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.payload || 'Failed to delete category';
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.error = action.payload || 'Failed to create category';
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (category) => category.idCategory === action.payload.idCategory
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.payload || 'Failed to update category';
      });
  },
});

export default categorySlice.reducer;
