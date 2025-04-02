import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUserApi, loginUserApi, registerOtpVerify } from './authService';
import { toast } from 'react-hot-toast'; // Import react-hot-toast

// Register User
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerUserApi(userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Registration failed");
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await loginUserApi(userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Login failed");
    }
  }
);

export const registerVerify = createAsyncThunk(
  'auth/registerVerify',
  async (userData, { rejectWithValue }) => {
    try {
      console.log("userData", userData)
      const data = await registerOtpVerify(userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Login failed");
    }
  }
);

const initialState = {
  loading: false,
  user: null,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle register user
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      console.log(action.payload);
      // toast.success(action.payload.message); // Display success toast
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
      // toast.error(state.error); // Display error toast
    });

    // Handle login user
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
      // toast.error(state.error); // Display error toast
    })

    builder.addCase(registerVerify.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerVerify.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      console.log("action.payload ", action.payload )
      state.token = action.payload.token;
      toast.success(action.payload.message);

    });
    builder.addCase(registerVerify.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
      console.log("action.payload ", action.payload )
      toast.error(state.error); // Display error toast
    });
  },
});

export default authSlice.reducer;
