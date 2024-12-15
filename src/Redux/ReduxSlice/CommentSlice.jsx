import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://26.232.136.42:8080/api/comment';


export const FetchComment = createAsyncThunk(
    'comment/FetchComment',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/getAllCommentOnChapter`);
            // Kiểm tra nếu response.data.result là mảng, nếu không trả về mảng rỗng
            return response.data.result || [];
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch comment',
            );
        }
    },
);

export const DeleteComment = createAsyncThunk(
    'comment/DeleteComment',
    async (idComment, { rejectWithValue }) => {
        try {
            await axios.delete(
                `${BASE_URL}/deleteComment?idComment=${idComment}`,
            );
            return idComment;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || 'Failed to delete comment',
            );
        }
    },
);

// Thunk to create a new category
export const CreateComment = createAsyncThunk(
    'comment/CreateComment',
    async (newComment, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/createComment`,
                newComment,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            return response.data.result;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to create createComment',
            );
        }
    },
);
export const UpdateComment = createAsyncThunk(
    'comment/UpdateComment',
    async (updateComment, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/updateComment`,
                updateComment,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            return response.data.result;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to update ',
            );
        }
    },
);

const CommentSlice = createSlice({
    name: 'comment',
    initialState: {
        comments: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(FetchComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(FetchComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(FetchComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to load Comment';
            })
            .addCase(DeleteComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter(
                    (author) => author.idComment !== action.payload,
                );
                alert('Xóa thành công');
            })
            .addCase(DeleteComment.rejected, (state, action) => {
                state.error = action.payload.message || 'Failed to delete comment';
                alert('Error: ' + state.error);
            })
            .addCase(CreateComment.fulfilled, (state, action) => {
                state.comments.push(action.payload);
                alert('Thêm thành công');
            })
            .addCase(CreateComment.rejected, (state, action) => {
                state.error = action.payload || 'Failed to create comment';
            })
            .addCase(UpdateComment.fulfilled, (state, action) => {
                console.log('Update fulfilled payload:', action.payload);
                const index = state.comments.findIndex(
                    (author) => author.idComment === action.payload.idComment,
                );
                if (index !== -1) {
                    state.comments[index] = {
                        ...state.comments[index],
                        ...action.payload,
                    };
                }
                alert(' cập thành công');
            })
            .addCase(UpdateComment.rejected, (state, action) => {
                console.error('Update rejected error:', action.payload);
                state.error = action.payload || 'Failed to update comment';
            });
    },
});

export default CommentSlice.reducer;