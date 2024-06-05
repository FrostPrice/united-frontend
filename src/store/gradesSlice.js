import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../ApiService";

export const getGrades = createAsyncThunk("grades/fetchGrades", async () => {
  const response = await ApiService.get("/api/grades");
  return response.data.data;
});

const gradesSlice = createSlice({
  name: "grades",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGrades.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getGrades.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getGrades.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default gradesSlice.reducer;
