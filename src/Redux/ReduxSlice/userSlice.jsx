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
            return response.data.result; // Giả sử API trả về `result` là thông tin người dùng
        } catch (error) {
            return rejectWithValue(
                error.response?.data || 'Failed to create user',
            );
        }
    },
);

export const FetchUser = createAsyncThunk(
    'user/FetchUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/getAllUser`);

            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch user',
            );
        }
    },
);

export const login = createAsyncThunk(
    'user/login',
    async ({ password, email }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, {
                password,
                email,
            });
            console.log(response);
            return response;
            // if (response.data && response.data.success) {
            //     console.log(response);
            //     return response;
            // } else {
            //     return rejectWithValue('Invalid email or password');
            // }
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to login');
        }
    },
);

export const UpdateUser = createAsyncThunk(
    'user/UpdateUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/updateUser`, // Đặt URL endpoint phù hợp
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            // Trả về kết quả thành công
            return response || {}; // Xử lý phản hồi thành công
        } catch (error) {
            return rejectWithValue(
                error.response?.data || 'Failed to update user', // Xử lý lỗi nếu có
            );
        }
    },
);
export const DeleteUser = createAsyncThunk(
    'user/DeleteUser',
    async (idUser, { rejectWithValue }) => {
        try {
            await axios.delete(`${BASE_URL}/deleteUser?idUser=${idUser}`);
            return idUser;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || 'Failed to delete comment',
            );
        }
    },
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
            if (response.data && typeof response.data.result === 'string') {
                return response.data.result; // Mã OTP trả về từ API
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
    user: null, // Thông tin người dùng
    email: '', // Email đã gửi OTP
    loading: false, // Trạng thái chờ
    success: false, // Trạng thái thành công
    error: null, // Lỗi
};

// Slice
const userSlice = createSlice({
    name: 'user',
    users: [],
    initialState,
    reducers: {
        resetState: (state) => {
            // Đặt lại trạng thái mặc định
            state.loading = false;
            state.success = false;
            state.error = null;
        },
        logout: (state) => {
            // Đăng xuất
            state.user = null;
            localStorage.removeItem('user');
        },
    },
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
            //
            .addCase(DeleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(
                    (user) => user.idUser !== action.payload,
                );
                alert('Xóa thành công');
            })
            .addCase(DeleteUser.rejected, (state, action) => {
                state.error =
                    action.payload.message || 'Failed to delete comment';
                alert('Error: ' + state.error);
            })
            .addCase(FetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(FetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.data.result;
                //console.log('', typeof chapter);
                //Array.from(comment).map((el)=>state.comments.push(el));
            })
            .addCase(FetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to load Comment';
            })
            // Handle login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload.data.result;
                console.log('payload comment', action.payload.data.result);
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
                state.email = action.payload; // Lưu mã OTP hoặc email
            })
            .addCase(sendOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to send OTP';
            })
            .addCase(UpdateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex(
                    (user) => user.idUser === action.payload.idUser,
                );
                if (index !== -1) {
                    state.users[index] = {
                        ...state.users[index],
                        ...action.payload,
                    };
                }
                alert(' cập thành công');
            })
            .addCase(UpdateUser.rejected, (state, action) => {
                console.error('Update rejected error:', action.payload);
                state.error = action.payload || 'Failed to update author';
            });
    },
});

// Export Reducer và Actions
export const { resetState, logout } = userSlice.actions;
export default userSlice.reducer;
