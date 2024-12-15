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
            // Kiểm tra nếu response.data.result là mảng, nếu không trả về mảng rỗng
            return Array.isArray(response.data.result)
                ? response.data.result
                : [];
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch categories',
            );
        }
    },
);

// Thunk to delete a category
export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (categoryId, { rejectWithValue }) => {
        try {
            await axios.delete(
                `${BASE_URL}/deleteCategory?idCategory=${categoryId}`,
            );
            return categoryId;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || 'Failed to delete category',
            );
        }
    },
);

// Thunk to create a new category
export const createCategory = createAsyncThunk(
    'category/createCategory',
    async (newCategory, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/createCategory`,
                newCategory,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            return response.data.result;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to create category',
            );
        }
    },
);

// Thunk to update a category
export const updateCategory = createAsyncThunk(
    'category/updateCategory',
    async ({ idCategory, updatedCategory }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL}/updateCategory`, {
                idCategory,
                nameCategory: updatedCategory.nameCategory, // Ensure correct property is used
            });
            return response.data.result;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to update category',
            );
        }
    },
);

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
        resetLoading: (state) => {
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                // Kiểm tra và gán categories là mảng hợp lệ
                if (Array.isArray(action.payload)) {
                    state.categories = action.payload;
                } else {
                    console.error(
                        'API response is not an array:',
                        action.payload,
                    );
                    state.categories = []; // Gán mảng rỗng nếu không phải mảng
                }
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to load categories';
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                const categoriesArray = Object.values(state.categories);
                state.categories = categoriesArray.filter(
                    (category) => Object.values(category)[0] != action.payload,
                );
                alert('Xóa thành công');
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.error =
                    action.payload.message || 'Failed to delete category';

                alert('Error: ' + state.error);
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                // Kiểm tra và thêm mới category vào mảng categories
                if (Array.isArray(state.categories)) {
                    state.categories.push(action.payload);
                    alert('Thêm thể loại thành công');
                } else {
                    console.error(
                        'state.categories is not an array:',
                        state.categories,
                    );
                    state.categories = [action.payload]; // Đặt thành mảng nếu không phải mảng
                }
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.error = action.payload || 'Failed to create category';
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                // Kiểm tra và cập nhật category trong mảng categories
                if (Array.isArray(state.categories)) {
                    const index = state.categories.findIndex(
                        (category) =>
                            category.idCategory === action.payload.idCategory,
                    );
                    if (index !== -1) {
                        state.categories[index] = action.payload; // Cập nhật category
                    }
                    alert('Sửa thể loại thành công');
                } else {
                    console.error(
                        'state.categories is not an array:',
                        state.categories,
                    );
                    state.categories = []; // Đặt lại thành mảng rỗng nếu không phải mảng
                }
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.error = action.payload || 'Failed to update category';
            });
    },
});

export const { resetError, resetLoading } = categorySlice.actions;

export default categorySlice.reducer;
