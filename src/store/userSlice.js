import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../ApiService";

// Thunks para operações assíncronas
export const fetchUser = createAsyncThunk("user/fetchUser", async (userId) => {
  const response = await ApiService.get("/api/users", userId);
  return response.data.data;
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData) => {
    const { userId, ...data } = userData;

    const response = await ApiService.update("/api/users", userId, data);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.status = "succeeded";
        // state.userInfo = { ...state.userInfo, ...action.payload };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
