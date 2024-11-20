import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://26.232.136.42:8080/api/chapter';

// Thunk để lấy tất cả các chapter
export const fetchChapters = createAsyncThunk(
    'chapter/fetchChapters',
    async (nameNovel, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/getAllChapter?nameNovel=${nameNovel}`,
            );
            return nameNovel;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || 'Failed to delete category',
            );
        }
    },
);

// Thunk để lấy tất cả chapter không có nội dung
export const fetchChaptersNoContent = createAsyncThunk(
    'chapter/fetchChaptersNoContent',
    async () => {
        const response = await axios.get(`${BASE_URL}/getAllChapterNoContent`);
        return response.data.result || [];
    },
);

// Thunk để kiểm tra chapter
export const testChapter = createAsyncThunk('chapter/testChapter', async () => {
    const response = await axios.get(`${BASE_URL}/testChapter`);
    return response.data.result || [];
});

// Thunk để tạo mới một chapter
export const createChapter = createAsyncThunk(
    'chapter/createChapter',
    async (newChapter, { rejectWithValue }) => {
        try {
            // Create a FormData object
            const formData = new FormData();

            // Append the file and other data
            formData.append('file', newChapter.file); // 'file' is the key for the file
            formData.append('request', JSON.stringify(newChapter.request)); // 'request' is the key for your object data

            // Send the POST request with the FormData object
            const response = await axios.post(
                `${BASE_URL}/createChapter`,
                formData,
            );

            return response.data.result; // Return the response data on success
        } catch (error) {
            return rejectWithValue(
                error.response?.data || 'Lỗi khi tạo chapter', // Return error message on failure
            );
        }
    },
);

// Thunk để tạo chapters với file PDF và thông tin khác

export const createChapters = createAsyncThunk(
    'chapter/createChapters',
    async (formData, { rejectWithValue }) => {
        try {
            // Gửi yêu cầu POST với dữ liệu là FormData
            const response = await axios.post(
                `${BASE_URL}/createChapters`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Đảm bảo định dạng đúng
                    },
                },
            );

            // Trả về kết quả nếu thành công
            return response.data.result || 'Chapters created successfully';
        } catch (error) {
            // Xử lý lỗi và trả về thông báo lỗi
            return rejectWithValue(
                error.response?.data || 'Error creating chapters',
            );
        }
    },
);

// Slice quản lý trạng thái liên quan đến chapter
const chapterSlice = createSlice({
    name: 'chapter',
    initialState: {
        chapters: [],
        chaptersNoContent: [],
        pages: [],
        chapterPage: [],
        loading: false,
        error: null,
        testResult: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchChapters
            .addCase(createChapters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChapters.fulfilled, (state, action) => {
                state.loading = false;
                state.chapters = action.payload;
            })
            .addCase(fetchChapters.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || 'Lỗi tải dữ liệu chapters';
            })
            // fetchChaptersNoContent
            .addCase(fetchChaptersNoContent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChaptersNoContent.fulfilled, (state, action) => {
                state.loading = false;
                state.chaptersNoContent = action.payload;
            })
            .addCase(fetchChaptersNoContent.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ||
                    'Lỗi tải chapters không có nội dung';
            })
            // testChapter
            .addCase(testChapter.fulfilled, (state, action) => {
                state.testResult = action.payload;
            })
            // createChapter
            .addCase(createChapter.fulfilled, (state, action) => {
                state.chapters.push(action.payload);
            })
            .addCase(createChapter.rejected, (state, action) => {
                state.error = action.payload || 'Lỗi khi tạo chapter';
            })
            // createChapters
            .addCase(createChapters.fulfilled, (state, action) => {
                state.loading = false;

                // Giả sử phản hồi trả về danh sách các chương
                state.chapters.push(
                    ...(Array.isArray(action.payload)
                        ? action.payload
                        : [action.payload]), // Nếu API trả về một mảng hoặc một đối tượng chương duy nhất
                );
            })

            .addCase(createChapters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Lỗi khi tạo chapters';
            });
    },
});

export default chapterSlice.reducer;
