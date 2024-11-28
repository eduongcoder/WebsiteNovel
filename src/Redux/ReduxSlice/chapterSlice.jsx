import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://26.232.136.42:8080/api/chapter';

// Thunk to fetch all chapters for a specific novel
export const fetchChapters = createAsyncThunk(
    'chapter/fetchChapters',
    async (idNovel, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/getAllChapterNoContentByNameNovel?idNovel=${idNovel}`,
            );
            return response.data.result; // Chỉ trả về mảng 'result'
        } catch (error) {
            // Xử lý lỗi và trả về thông báo chi tiết nếu có lỗi
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch chapters',
            );
        }
    },
);

// Thunk to fetch all chapters without content
export const fetchChaptersNoContent = createAsyncThunk(
    'chapter/fetchChaptersNoContent',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/getAllChapterNoContent`,
            );
            return response.data.result || [];
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    'Failed to fetch chapters without content',
            );
        }
    },
);

// Thunk to test chapter functionality
export const testChapter = createAsyncThunk(
    'chapter/testChapter',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/testChapter`);
            return response.data.result || [];
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Test chapter failed',
            );
        }
    },
);
export const deleteChapters = createAsyncThunk(
    'chapter/deleteChapters',
    async (idChapter, { rejectWithValue }) => {
        try {
            await axios.delete(
                `${BASE_URL}/deleteChapter?idChapter=${idChapter}`,
            );
            return idChapter;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || 'Failed to delete author',
            );
        }
    },
);
// Thunk to create a new chapter
export const createChapter = createAsyncThunk(
    'chapter/createChapter',
    async (newChapter, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('file', newChapter.file);
            formData.append('request', JSON.stringify(newChapter.request));

            const response = await axios.post(
                `${BASE_URL}/createChapter`,
                formData,
            );
            return response.data.result; // Return created chapter
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to create chapter',
            );
        }
    },
);

// Thunk to create multiple chapters with PDF and other info
export const createChapters = createAsyncThunk(
    'chapter/createChapters',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/createChapters`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            return response.data.result || 'Chapters created successfully';
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Error creating chapters',
            );
        }
    },
);
// Chapter slice to manage state
const chapterSlice = createSlice({
    name: 'chapter',
    initialState: {
        chapters: [],
        chaptersNoContent: [],
        loading: false,
        error: null,
        testResult: null,
    },
    
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch chapters
            .addCase(fetchChapters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChapters.fulfilled, (state, action) => {
                // Save the chapters directly in the state
                state.chapters = action.payload; // action.payload is the array of chapters
                state.loading = false;
            })
            .addCase(fetchChapters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch chapters';
            })
            // Delete chapters
            .addCase(deleteChapters.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteChapters.fulfilled, (state, action) => {
                state.loading = false;
                state.chapters = state.chapters.filter(
                    (chapter) => chapter.idChapter !== action.payload,
                );
            })
            .addCase(deleteChapters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to delete chapter';
            })
            // Create single chapter
            .addCase(createChapter.pending, (state) => {
                state.loading = true;
            })
            .addCase(createChapter.fulfilled, (state, action) => {
                state.loading = false;
                state.chapters.push(action.payload);
            })
            .addCase(createChapter.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to create chapter';
            });
    },
});

export default chapterSlice.reducer;
