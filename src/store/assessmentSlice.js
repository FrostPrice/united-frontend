import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../ApiService";

// Thunk para buscar todos os assessments
export const getAssessments = createAsyncThunk(
  "api/getAssessments",
  async () => {
    const response = await ApiService.get("/api/assessments");
    return response.data.data;
  }
);

// Thunk para fazer upload do arquivo
export const uploadFile = createAsyncThunk(
  "api/uploadFile",
  async ({ assessmentId, formData }) => {
    const response = await ApiService.post(
      `/api/assessments/${assessmentId}/upload`,
      formData
    );
    return response.data;
  }
);

const assessmentsSlice = createSlice({
  name: "assessments",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAssessments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAssessments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getAssessments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(uploadFile.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default assessmentsSlice.reducer;
