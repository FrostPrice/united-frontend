import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../ApiService";

// Thunk para buscar todos os professores
export const get = createAsyncThunk("api/getProfessors", async () => {
  const response = await ApiService.get("/api/professors");
  return response.data.data;
});

const professorsSlice = createSlice({
  name: "professors",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get.pending, (state) => {
        state.status = "loading";
      })
      .addCase(get.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(get.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default professorsSlice.reducer;
