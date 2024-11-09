import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk để lấy tất cả các chapter
export const fetchChapters = createAsyncThunk(
  'chapter/fetchChapters',
  async () => {
    const response = await axios.get('http://26.232.136.42:8080/api/chapter/getAllChapter');
    return response.data.result || [];
  }
);

// Thunk để lấy tất cả chapter không có nội dung
export const fetchChaptersNoContent = createAsyncThunk(
  'chapter/fetchChaptersNoContent',
  async () => {
    const response = await axios.get('http://26.232.136.42:8080/api/chapter/getAllChapterNoContent');
    return response.data.result || [];
  }
);

// Thunk để kiểm tra chapter
export const testChapter = createAsyncThunk(
  'chapter/testChapter',
  async () => {
    const response = await axios.get('http://26.232.136.42:8080/api/chapter/testChapter');
    return response.data.result || [];
  }
);

// Thunk để tạo mới chapter
export const createChapter = createAsyncThunk(
  'chapter/createChapter',
  async (newChapter) => {
    const response = await axios.post('http://26.232.136.42:8080/api/chapter/createChapter', newChapter);
    return response.data.result; // Trả về chapter vừa tạo
  }
);

// Thunk để lấy các trang của chapter
export const fetchChapterPages = createAsyncThunk(
  'chapter/fetchChapterPages',
  async (chapterId) => {
    const response = await axios.get(`http://26.232.136.42:8080/api/chapter/pages/${chapterId}`);
    return response.data.result || [];
  }
);

// Thunk để lấy chapter theo trang
export const fetchChapterPage = createAsyncThunk(
  'chapter/fetchChapterPage',
  async (pageNumber) => {
    const response = await axios.get(`http://26.232.136.42:8080/api/chapter/page/${pageNumber}`);
    return response.data.result || [];
  }
);

// Thunk để xóa category
export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (categoryId) => {
    const response = await axios.delete(`http://26.232.136.42:8080/api/category/deleteCategory/${categoryId}`);
    return categoryId; // Trả về id của category vừa bị xóa
  }
);

const chapterSlice = createSlice({
  name: 'chapter',
  initialState: {
    chapters: [],
    pages: [],
    chapterPage: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Đang tải dữ liệu chapters
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
      // Đang tải dữ liệu chapters không có nội dung
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
        state.error = action.error.message || 'Lỗi tải dữ liệu chapters không có nội dung';
      })
      // Kiểm tra chapter
      .addCase(testChapter.fulfilled, (state, action) => {
        state.testResult = action.payload;
      })
      // Tạo mới chapter
      .addCase(createChapter.fulfilled, (state, action) => {
        state.chapters.push(action.payload); // Thêm chapter mới vào state
      })
      // Lấy các trang của chapter
      .addCase(fetchChapterPages.fulfilled, (state, action) => {
        state.pages = action.payload;
      })
      // Lấy chapter theo trang
      .addCase(fetchChapterPage.fulfilled, (state, action) => {
        state.chapterPage = action.payload;
      })
      // Xóa category thành công
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.idCategory !== action.payload
        );
      });
  },
});

export default chapterSlice.reducer;
