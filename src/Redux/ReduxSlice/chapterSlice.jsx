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
            console.log(response);
            return response; // Chỉ trả về mảng 'result'
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
export const updateChapter = createAsyncThunk(
    'chapter/updateChapter',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/updateChapter`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            return response.data.result; // Return updated chapter
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to update chapter',
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
            formData.append(
                'request',
                new Blob([JSON.stringify(newChapter.request)], {
                    type: 'multipart/form-data',
                }),
            );

            const response = await axios.post(
                `${BASE_URL}/createChapter`,
                formData,
            );
            return response.data.result; // Trả về kết quả nếu thành công
        } catch (error) {
            // Trả về lỗi nếu xảy ra
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
                formData, // Send the requestBody containing the 'request' field
                {
                    headers: {
                        'Content-Type': 'application/json', // Use application/json for JSON payload
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

export const fetchPdfData = createAsyncThunk(
    'chapter/fetchPdfData',
    async ({ pageNum, pdfId, pageGet }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/pages?id=${pdfId}&page=${pageNum}&pageGet=${pageGet}`,
            );
            const data = response.data; // Chỉnh sửa để lấy đúng dữ liệu
            if (data.result?.pageContent && data.result.totalPages > 0) {
                return {
                    pageContent: data.result.pageContent, // Mảng Base64 của từng trang
                    totalPages: data.result.totalPages,
                };
            } else {
                return rejectWithValue('No more pages to load');
            }
        } catch (error) {
            console.error('Error fetching PDF data:', error);
            return rejectWithValue(error.message || 'Failed to fetch PDF data');
        }
    },
);

// Chapter slice to manage state
const chapterSlice = createSlice({
    name: 'chapter',
    initialState: {
        chapters: [],
        chaptersNoContent: [],
        pdfData: [],
        loading: false,
        error: null,
        hasMore: true,
        testResult: null,
        lastUpdated: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch chapters by novel ID
            .addCase(fetchChapters.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchChapters.fulfilled, (state, action) => {
                state.loading = false;
                const chapter = action.payload.data.result;
                //console.log('', typeof chapter);
                Array.from(chapter).map((el)=>state.chapters.push(el));
            })
            .addCase(fetchChapters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Fetch chapters without content
            .addCase(fetchChaptersNoContent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChaptersNoContent.fulfilled, (state, action) => {
                state.chaptersNoContent = action.payload || [];
                state.loading = false;
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(fetchChaptersNoContent.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload ||
                    'Failed to fetch chapters without content';
            })
            // Delete a chapter
            .addCase(deleteChapters.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteChapters.fulfilled, (state, action) => {
                state.loading = false;
                state.chapters = state.chapters.filter(
                    (chapter) => chapter.idChapter !== action.payload,
                );
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(deleteChapters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to delete chapter';
            })
            .addCase(updateChapter.fulfilled, (state, action) => {
                const index = state.chapters.findIndex(
                    (chapter) => chapter.idChapter === action.payload.idChapter,
                );
                if (index !== -1) {
                    state.chapters[index] = {
                        ...state.chapters[index],
                        ...action.payload,
                    };
                }
            })
            // Handle PDF data fetching
            .addCase(fetchPdfData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPdfData.fulfilled, (state, action) => {
                state.loading = false;
                state.pdfData = action.payload.pageContent; // Lưu trực tiếp chuỗi Base64
                state.hasMore =
                    action.payload.totalPages > state.pdfData.length;
            })
            .addCase(fetchPdfData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default chapterSlice.reducer;
