import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../ApiService";

// Thunk para buscar todos os contents
export const getContents = createAsyncThunk("api/getContents", async () => {
  const response = await ApiService.get("/api/contents");
  return response.data.data;
});

const contentsSlice = createSlice({
  name: "contents",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getContents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getContents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default contentsSlice.reducer;
