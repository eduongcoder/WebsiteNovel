import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://26.232.136.42:8080/api/novel';

// Utility function for error handling in async thunks
const handleError = (error, rejectWithValue) =>
    rejectWithValue(
        error.response?.data?.message || 'An unexpected error occurred',
    );

// Async Thunks
export const fetchNovels = createAsyncThunk(
    'novel/fetchNovels',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/getNovelsNoChapter`);
            return response.data.result || [];
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    },
);

export const fetchNovelOnlyName = createAsyncThunk(
    'novel/fetchNovelOnlyName',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/getAllNovelsJustIdAndName`,
            );
            return response.data.result || [];
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    },
);

export const createNovel = createAsyncThunk(
    'novel/createNovel',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/createNovel`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } },
            );
            return response.data.result || 'Novel created successfully';
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    },
);

export const updateNovel = createAsyncThunk(
    'novel/updateNovel',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/updateNovel`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } },
            );
            return response.data.result || {};
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    },
);

// Fetch novel by name
export const fetchNovelByName = createAsyncThunk(
    'novel/fetchNovelByName',
    async (name, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/getNovelByName?name=${name}`,
            );
            return response.data.result || {};
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    },
);

// Additional Fetch Functions (Optional)
export const fetchNovelsNoImage = createAsyncThunk(
    'novel/fetchNovelsNoImage',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/getNovelsNoImage`);
            return response.data.result || [];
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    },
);

// Add Category/Author/POV
export const addCategory = createAsyncThunk(
    'novel/addCategory',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/addCategory`, data);
            return response.data.result || {};
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    },
);

export const addAuthor = createAsyncThunk(
    'novel/addAuthor',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/addAuthor`, data);
            return response.data.result || {};
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    },
);

export const addPOV = createAsyncThunk(
    'novel/addPOV',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/addPOV`, data);
            return response.data.result || {};
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    },
);

// Carousel Images
export const fetchImages = createAsyncThunk(
    'carousel/fetchImages',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/getNovelsNoChapter`);
            return response.data.result || [];
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    },
);

// Slice
const novelSlice = createSlice({
    name: 'novel',
    initialState: {
        novels: [],
        currentNovel: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNovels.fulfilled, (state, action) => {
                console.log('Fetch novels fulfilled:', action.payload); // Log dữ liệu
                state.novels = action.payload; // Gán dữ liệu vào novels
                state.loading = false;
            })
            .addCase(fetchNovelOnlyName.fulfilled, (state, action) => {
                state.novels = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchNovelByName.fulfilled, (state, action) => {
                state.currentNovel = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(createNovel.fulfilled, (state, action) => {
                state.novels.push(action.payload);
                state.loading = false;
            })
            .addCase(updateNovel.fulfilled, (state, action) => {
                const index = state.novels.findIndex(
                    (novel) => novel.idNovel === action.payload.idNovel,
                );
                if (index !== -1) {
                    state.novels[index] = {
                        ...state.novels[index],
                        ...action.payload,
                    };
                }
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                    state.error = null;
                },
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.loading = false;
                    state.error =
                        action.payload || 'An unexpected error occurred';
                },
            );
    },
});

export default novelSlice.reducer;
