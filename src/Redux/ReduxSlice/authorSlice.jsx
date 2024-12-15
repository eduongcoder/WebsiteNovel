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
            const formData = new FormData();
            // Thêm hình ảnh
            formData.append('image', newAuthor.file);
            // Thêm thông tin mô tả dưới dạng object JSON
            formData.append(
                'request',
                new Blob(
                    [
                        JSON.stringify({
                            descriptionAuthor: newAuthor.descriptionAuthor,
                            nameAuthor: newAuthor.nameAuthor,
                            nationality: newAuthor.nationality,
                            dobAuthor: newAuthor.dobAuthor,
                            dodAuthor: newAuthor.dodAuthor,
                        }),
                    ],
                    { type: 'application/json' },
                ),
            );

            const response = await axios.post(
                `${BASE_URL}/createAuthor`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            );
            return response.data.result || {};
        } catch (error) {
            return rejectWithValue(
                error.response?.data || 'Failed to create author',
            );
        }
    },
);

// Thunk để cập nhật tác giả

export const updateAuthor = createAsyncThunk(
    'author/updateAuthor',
    async (formData, { rejectWithValue }) => {
        try {
            // Gửi PUT request với 'multipart/form-data'
            const response = await axios.put(
                `${BASE_URL}/updateAuthor`, // Đặt URL endpoint phù hợp
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            // Trả về kết quả thành công
            return response.data.result || {}; // Xử lý phản hồi thành công
        } catch (error) {
            return rejectWithValue(
                error.response?.data || 'Failed to update author', // Xử lý lỗi nếu có
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
            .addCase(fetchAuthors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAuthors.fulfilled, (state, action) => {
                state.loading = false;
                state.authors = action.payload;
            })
            .addCase(fetchAuthors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to load authors';
            })
            .addCase(deleteAuthor.fulfilled, (state, action) => {
                state.authors = state.authors.filter(
                    (author) => author.idAuthor !== action.payload,
                );
                alert('Xóa thành công');
            })
            .addCase(deleteAuthor.rejected, (state, action) => {
                state.error = action.payload.message || 'Failed to delete author';
                alert('Error: ' + state.error);
            })
            .addCase(createAuthor.fulfilled, (state, action) => {
                state.authors.push(action.payload);
                alert('Thêm thành công');
            })
            .addCase(createAuthor.rejected, (state, action) => {
                state.error = action.payload || 'Failed to create author';
            })
            .addCase(updateAuthor.fulfilled, (state, action) => {
                console.log('Update fulfilled payload:', action.payload);
                const index = state.authors.findIndex(
                    (author) => author.idAuthor === action.payload.idAuthor,
                );
                if (index !== -1) {
                    state.authors[index] = {
                        ...state.authors[index],
                        ...action.payload,
                    };
                }
                alert(' cập thành công');
            })
            .addCase(updateAuthor.rejected, (state, action) => {
                console.error('Update rejected error:', action.payload);
                state.error = action.payload || 'Failed to update author';
            });
    },
});

export default authorSlice.reducer;
