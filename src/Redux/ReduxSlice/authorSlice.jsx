import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for API
const BASE_URL = 'http://26.232.136.42:8080/api/author';

// Thunk to fetch authors
export const fetchAuthors = createAsyncThunk(
    'author/fetchAuthors',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/getAllAuthor`);
            return response.data.result || [];
        } catch (error) {
            return rejectWithValue(
                error.response?.data || 'Failed to fetch authors',
            );
        }
    },
);

// Thunk to delete an author
export const deleteAuthor = createAsyncThunk(
    'author/deleteAuthor',
    async (authorId, { rejectWithValue }) => {
        try {
            await axios.delete(`${BASE_URL}/deleteAuthor?idAuthor=${authorId}`);
            return authorId;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || 'Failed to delete author',
            );
        }
    },
);

// Thunk to create a new author
export const createAuthor = createAsyncThunk(
    'author/createAuthor',
    async (newAuthor, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/createAuthor`,
                newAuthor,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            return response.data.result;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || 'Failed to create author',
            );
        }
    },
);

// Thunk to update an author
export const updateAuthor = createAsyncThunk(
    'author/updateAuthor',
    async ({ idAuthor, updatedAuthor }, { rejectWithValue }) => {
        try {
            // Request PUT với dữ liệu cập nhật gửi đi
            const response = await axios.put(`${BASE_URL}/updateAuthor`, {
                idAuthor,
                ...updatedAuthor,
            });
            return response.data.result;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || 'Failed to update author',
            );
        }
    },
);

// Slice for author data
const authorSlice = createSlice({
    name: 'author',
    initialState: {
        authors: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch authors pending state
            .addCase(fetchAuthors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Fetch authors fulfilled state
            .addCase(fetchAuthors.fulfilled, (state, action) => {
                state.loading = false;
                state.authors = action.payload;
            })
            // Fetch authors rejected state
            .addCase(fetchAuthors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to load authors';
            })
            // Delete author fulfilled state
            .addCase(deleteAuthor.fulfilled, (state, action) => {
                state.authors = state.authors.filter(
                    (author) => author.idAuthor !== action.payload,
                );
            })
            // Delete author rejected state
            .addCase(deleteAuthor.rejected, (state, action) => {
                state.error = action.payload || 'Failed to delete author';
            })
            // Create author fulfilled state
            .addCase(createAuthor.fulfilled, (state, action) => {
                state.authors.push(action.payload);
            })
            // Create author rejected state
            .addCase(createAuthor.rejected, (state, action) => {
                state.error = action.payload || 'Failed to create author';
            })
            // Update author fulfilled state
            .addCase(updateAuthor.fulfilled, (state, action) => {
                console.log('Update fulfilled payload:', action.payload); // Kiểm tra dữ liệu trả về
                const index = state.authors.findIndex(
                    (author) => author.idAuthor === action.payload.idAuthor,
                );
                if (index !== -1) {
                    state.authors[index] = action.payload;
                }
            })
            .addCase(updateAuthor.rejected, (state, action) => {
                console.error('Update rejected error:', action.payload); // Kiểm tra lỗi
                state.error = action.payload || 'Failed to update author';
            });
    },
});

export default authorSlice.reducer;
