import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://26.232.136.42:8080/api/chapter';

// Thunk để lấy tất cả các chapter
export const fetchChapters = createAsyncThunk(
  'chapter/fetchChapters',
  async () => {
    const response = await axios.get(`${BASE_URL}/getAllChapter`);
    return response.data.result || [];
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
export const testChapter = createAsyncThunk(
  'chapter/testChapter',
  async () => {
    const response = await axios.get(`${BASE_URL}/testChapter`);
    return response.data.result || [];
  }
);

// Thunk để tạo mới một chapter
export const createChapter = createAsyncThunk(
  'chapter/createChapter',
  async (newChapter, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/createChapter`, newChapter);
      return response.data.result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Lỗi khi tạo chapter'
      );
    }
  }
);

// Thunk để tạo chapters với file PDF và thông tin khác
export const createChapters = createAsyncThunk(
  'chapter/createChapters',
  async (
    { filePdf, idNovel, totalChapter, chapterPagesArray },
    { rejectWithValue }
  ) => {
    try {
      // Kiểm tra các tham số bắt buộc trước khi gửi
      if (!filePdf || !idNovel || !totalChapter || !chapterPagesArray) {
        return rejectWithValue('Vui lòng điền đủ thông tin');
      }

      const formData = new FormData();
      // Thêm tệp PDF vào FormData
      formData.append('filePdf', filePdf);
      // Thêm các trường dữ liệu khác vào FormData
      formData.append('idNovel', idNovel);
      formData.append('totalChapter', totalChapter);
      formData.append('chapterPagesArray', JSON.stringify(chapterPagesArray));

      // Gửi yêu cầu POST với Content-Type là multipart/form-data
      const response = await axios.post(
        `${BASE_URL}/createChapters`, // Địa chỉ API
        formData, // Dữ liệu gửi đi
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Trình duyệt tự động thiết lập này, nhưng hãy giữ cho rõ ràng
          },
        }
      );

      // Trả về kết quả từ response
      return response.data.result;
    } catch (error) {
      // Kiểm tra và trả về lỗi nếu có
      if (error.response) {
        return rejectWithValue(error.response.data || 'Lỗi khi tạo chapters');
      } else {
        return rejectWithValue('Lỗi kết nối hoặc máy chủ không phản hồi');
      }
    }
  }
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
      .addCase(fetchChapters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChapters.fulfilled, (state, action) => {
        state.loading = false;
        state.chapters = action.payload;
      })
      .addCase(fetchChapters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Lỗi tải dữ liệu chapters';
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
        state.error = action.error.message || 'Lỗi tải chapters không có nội dung';
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
        state.chapters.push(...action.payload); // Giả định kết quả là một mảng chapters
      })
      .addCase(createChapters.rejected, (state, action) => {
        state.error = action.payload || 'Lỗi khi tạo chapters';
      });
  }
});

export default chapterSlice.reducer;
