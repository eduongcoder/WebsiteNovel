import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://26.232.136.42:8080/api/novel';

// Utility function for error handling in async thunks
const handleError = (error, rejectWithValue) => {
    return rejectWithValue(
        error.response?.data?.message || 'An unexpected error occurred',
    );
};

// Fetch all novels without chapters
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
            const response = await axios.get(`${BASE_URL}/getAllNovelsJustIdAndName`);
            return response.data.result || [];
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    },
);
// Fetch images for carousel
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

const carouselSlice = createSlice({
    name: 'carousel',
    initialState: {
        images: [],
        currentIndex: 0,
        error: null,
    },
    reducers: {
        setCurrentIndex: (state, action) => {
            state.currentIndex = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchImages.fulfilled, (state, action) => {
                state.images = action.payload;
                state.error = null;
            })
            .addCase(fetchImages.rejected, (state, action) => {
                console.error('Error fetching images:', action.error);
                state.error = action.error.message || 'Failed to fetch images';
            });
    },
});

export const { setCurrentIndex } = carouselSlice.actions;

// Fetch a single novel by its name
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

// Create a new novel
export const createNovel = createAsyncThunk(
    'novel/createNovel',
    async (novelData, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('image', novelData.file);
            formData.append(
                'request',
                new Blob(
                    [
                        JSON.stringify({
                            id_Novel: novelData.id_Novel,
                            name_Novel: novelData.name_Novel,
                            description_Novel: novelData.description_Novel,
                            status_Novel: novelData.status_Novel,
                        }),
                    ],
                    { type: 'application/json' },
                ),
            );

            const response = await axios.post(
                `${BASE_URL}/createNovel`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            );

            return response.data.result || {};
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    },
);

// Add POV (Point of View) to a novel
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

// Add category to a novel
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

// Add author to a novel
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

// Fetch novels without images
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

// Fetch novels with images
export const fetchNovelsWithImage = createAsyncThunk(
    'novel/fetchNovelsWithImage',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/getNovels`);
            return response.data.result || [];
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    },
);

// Test image endpoint
export const testImage = createAsyncThunk(
    'novel/testImage',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/testImage`);
            return response.data.result || {};
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    },
);

const novelSlice = createSlice({
    name: 'novel',
    initialState: {
        novels: [],
        loading: false,
        error: null,
        currentNovel: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNovels.fulfilled, (state, action) => {
                state.novels = action.payload;
                state.loading = false;
                state.error = null;
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
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled'),
                (state) => {
                    state.loading = false;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload || 'An unexpected error occurred';
                }
            );
    },
});


export default novelSlice.reducer;
