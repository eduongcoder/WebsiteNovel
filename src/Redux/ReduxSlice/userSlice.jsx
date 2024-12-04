import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for API
const BASE_URL = 'http://26.232.136.42:8080/api/user';

// Thunks
export const createUser = createAsyncThunk(
    'user/createUser',
    async (newUser, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/createUser`,
                newUser,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            return response.data.result;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || 'Failed to create user',
            );
        }
    },
);

// Redux action for login
export const login = createAsyncThunk(
    'user/login',
    async ({  password , email }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, {
                password,  
                email,
            });

            if (response.data && response.data.success) {
                return response.data.user; // Giả sử API trả về thông tin người dùng nếu đăng nhập thành công
            } else {
                return rejectWithValue('Invalid email or password');
            }
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to login');
        }
    }
);


export const sendOTP = createAsyncThunk(
    'user/sendOTP',
    async (email, { rejectWithValue }) => {
        try {
            if (!email) {
                return rejectWithValue('Invalid email used in sendOTP');
            }
            const response = await axios.post(
                `${BASE_URL}/sendOTP?email=${email}`,
            );
            if (response.data && response.data.result !== 'string') {
                // Trả về mã OTP thực tế (hoặc giá trị cần thiết từ API)
                return response.data.result; // Giả sử đây là mã OTP thực sự
            } else {
                return rejectWithValue('Failed to send OTP: No result found.');
            }
        } catch (error) {
            return rejectWithValue(
                error.response?.data || 'Failed to send OTP',
            );
        }
    },
);

// Initial State
const initialState = {
    user: null,
    email: '',
    loading: false,
    success: false,
    error: null,
};

// Slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle createUser
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to create user';
            })
            // Handle login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to login user';
            })
            // Handle sendOTP
            .addCase(sendOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.email = action.payload;
            })
            .addCase(sendOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to send OTP';
            });
    },
});

// Export Reducer
export default userSlice.reducer;
