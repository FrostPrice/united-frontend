import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../ApiService";

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const response = await ApiService.get("api/events");
  return response.data.data;
});

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
        state.error = null;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default eventsSlice.reducer;
