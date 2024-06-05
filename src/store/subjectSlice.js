import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../ApiService";

export const getSubjects = createAsyncThunk(
  "subjects/fetchSubjects",
  async () => {
    const response = await ApiService.get("/api/subjects");
    return response.data.data;
  }
);

export const getSubjectById = createAsyncThunk(
  "subjects/fetchSubjectById",
  async (id) => {
    const response = await ApiService.get("/api/subjects", id);
    return response.data.data;
  }
);

const subjectsSlice = createSlice({
  name: "subjects",
  initialState: {
    subjects: [],
    subject: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSubjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subjects = action.payload;
      })
      .addCase(getSubjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getSubjectById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSubjectById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subject = action.payload;
      })
      .addCase(getSubjectById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default subjectsSlice.reducer;
