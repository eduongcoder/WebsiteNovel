import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { comment } from 'postcss';

const BASE_URL = 'http://26.232.136.42:8080/api/comment';

export const FetchComment = createAsyncThunk(
    'comment/FetchComment',
    async (idChapter, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/getAllCommentOnChapter?idChapter=${idChapter}`,
            );
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch comment',
            );
        }
    },
);
export const FetchCommentNovel = createAsyncThunk(
    'comment/FetchCommentNovel',
    async (idNovel, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/getAllCommentOnNovel?idNovel=${idNovel}`,
            );
           
            return response.data.result;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch comment novel',
            );
        }
    },
);
export const LikeComment = createAsyncThunk(
    'comment/LikeComment',
    async (idComment, { rejectWithValue }) => {
        try {
             await axios.put(
                `${BASE_URL}/likeComment?idComment=${idComment}`,
            );
            return idComment;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to like comment',
            );
        }
    },
);

export const DisLikeComment = createAsyncThunk(
    'comment/DisLikeComment',
    async (idComment, { rejectWithValue }) => {
        try {
             await axios.put(
                `${BASE_URL}/dislikeComment?idComment=${idComment}`,
            );
            return idComment;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to like comment',
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
                error.response?.data?.message ||
                    'Failed to create createComment',
            );
        }
    },
);
export const UpdateComment = createAsyncThunk(
    'comment/UpdateComment',
    async (updateComment, { rejectWithValue }) => {
        try {
            const response = await axios.put(
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
        commentsNovels: [],
        likedComments: [],
        dislikeComments: [],
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
                state.comments = action.payload.data.result;
                //console.log('', typeof chapter);
                //Array.from(comment).map((el)=>state.comments.push(el));
            })
            .addCase(FetchComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to load Comment';
            })
            .addCase(FetchCommentNovel.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(FetchCommentNovel.fulfilled, (state, action) => {
                state.loading = false;
                state.commentsNovels = action.payload;
                console.log('Comment FetchCommentNovel :', action.payload);
                //console.log('', typeof chapter);
                //Array.from(comment).map((el)=>state.comments.push(el));
            })
            .addCase(FetchCommentNovel.rejected, (state, action) => {
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
                state.error =
                    action.payload.message || 'Failed to delete comment';
                alert('Error: ' + state.error);
            })
            .addCase(LikeComment.fulfilled, (state, action) => {
                state.likedComments.push(action.payload); // Thêm ID comment đã like vào danh sách
            })
            .addCase(DisLikeComment.fulfilled, (state, action) => {
                state.dislikeComments.push(action.payload); // Thêm ID comment đã like vào danh sách
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
