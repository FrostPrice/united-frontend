import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../ApiService";

export const getNotifications = createAsyncThunk(
  "api/getNotifications",
  async () => {
    const response = await ApiService.get("/api/notifications");
    return response.data.data;
  }
);

export const put = createAsyncThunk(
  "api/putNotifications",
  async (notification) => {
    const { id, status } = notification;
    await ApiService.put(`/api/notifications/${id}`, {
      status: "viewed",
    });
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    markAsRead: (state, action) => {
      const notification = state.items.find(
        (notification) => notification.id === action.payload
      );
      if (notification) {
        notification.status = "viewed";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(put.pending, (state) => {
        state.status = "loading";
      })
      .addCase(put.fulfilled, (state) => {
        state.error = null;
      });
  },
});

export const { markAsRead } = notificationSlice.actions;

export default notificationSlice.reducer;
