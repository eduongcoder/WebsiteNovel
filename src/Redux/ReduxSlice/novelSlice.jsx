import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all novels without chapters
export const fetchNovels = createAsyncThunk('novel/fetchNovels', async () => {
    const response = await axios.get(
        'http://26.232.136.42:8080/api/novel/getNovelsNoChapter',
    );
    return response.data.result || [];
});

// Fetch a single novel by its name
export const fetchNovelByName = createAsyncThunk(
    'novel/fetchNovelByName',
    async (name) => {
        const response = await axios.get(
            `http://26.232.136.42:8080/api/novel/getNovelByName?name=${name}`,
        );
        return response.data.result || {};
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
                'http://26.232.136.42:8080/api/novel/createNovel',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            return response.data.result || {};
        } catch (error) {
            // Handle error and reject with value for error handling in reducers
            return rejectWithValue(
                error.response?.data || 'Failed to create novel',
            );
        }
    },
);

// Add POV (Point of View) to a novel
export const addPOV = createAsyncThunk('novel/addPOV', async (data) => {
    const response = await axios.post(
        'http://26.232.136.42:8080/api/novel/addPOV',
        data,
    );
    return response.data.result || {};
});

// Add category to a novel
export const addCategory = createAsyncThunk(
    'novel/addCategory',
    async (data) => {
        const response = await axios.post(
            'http://26.232.136.42:8080/api/novel/addCategory',
            data,
        );
        return response.data.result || {};
    },
);

// Add author to a novel
export const addAuthor = createAsyncThunk('novel/addAuthor', async (data) => {
    const response = await axios.post(
        'http://26.232.136.42:8080/api/novel/addAuthor',
        data,
    );
    return response.data.result || {};
});

// Fetch novels without images
export const fetchNovelsNoImage = createAsyncThunk(
    'novel/fetchNovelsNoImage',
    async () => {
        const response = await axios.get(
            'http://26.232.136.42:8080/api/novel/getNovelsNoImage',
        );
        return response.data.result || [];
    },
);

// Fetch novels with images
export const fetchNovelsWithImage = createAsyncThunk(
    'novel/fetchNovelsWithImage',
    async () => {
        const response = await axios.get(
            'http://26.232.136.42:8080/api/novel/getNovels',
        );
        return response.data.result || [];
    },
);

// Test image endpoint (for example)
export const testImage = createAsyncThunk('novel/testImage', async () => {
    const response = await axios.get(
        'http://26.232.136.42:8080/api/novel/testImage',
    );
    return response.data.result || {};
});

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
            .addCase(fetchNovels.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNovels.fulfilled, (state, action) => {
                state.loading = false;
                state.novels = action.payload;
            })
            .addCase(fetchNovels.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error fetching novels';
            })

            .addCase(fetchNovelByName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNovelByName.fulfilled, (state, action) => {
                state.loading = false;
                state.currentNovel = action.payload;
            })
            .addCase(fetchNovelByName.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || 'Error fetching novel by name';
            })

            .addCase(createNovel.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNovel.fulfilled, (state, action) => {
                state.loading = false;
                state.novels.push(action.payload); // Add newly created novel to the list
            })
            .addCase(createNovel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error creating novel';
            })

            .addCase(addPOV.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addPOV.fulfilled, (state, action) => {
                state.loading = false;
                // Optionally handle POV addition here
            })
            .addCase(addPOV.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error adding POV';
            })

            .addCase(addCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.loading = false;
                // Optionally update the category of a novel here
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error adding category';
            })

            .addCase(addAuthor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addAuthor.fulfilled, (state, action) => {
                state.loading = false;
                // Optionally update the author of a novel here
            })
            .addCase(addAuthor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error adding author';
            })

            .addCase(fetchNovelsNoImage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNovelsNoImage.fulfilled, (state, action) => {
                state.loading = false;
                state.novels = action.payload;
            })
            .addCase(fetchNovelsNoImage.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ||
                    'Error fetching novels without images';
            })

            .addCase(fetchNovelsWithImage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNovelsWithImage.fulfilled, (state, action) => {
                state.loading = false;
                state.novels = action.payload;
            })
            .addCase(fetchNovelsWithImage.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || 'Error fetching novels with images';
            })

            .addCase(testImage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(testImage.fulfilled, (state, action) => {
                state.loading = false;
                // Optionally handle the test image result here
            })
            .addCase(testImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error testing image';
            });
    },
});

export default novelSlice.reducer;
