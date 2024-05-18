import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../ApiService";

export const get = createAsyncThunk("api/getNotifications", async () => {
  const response = await ApiService.get("api/notifications");
  return response.data.data;
});

export const put = createAsyncThunk(
  "api/putNotifications",
  async (notification) => {
    const { id, status } = notification;
    await ApiService.put(`api/notifications/${id}`, {
      status: "viewed",
    });
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [
      {
        id: 1,
        status: "new",
        title: "Nota de Banco de Dados Postada",
        description: "Little Debas",
        date: "Nota Lançada",
      },
      {
        id: 2,
        status: "new",
        title: "Nota de Calculo 2 Postada",
        description: "Dalphias",
        date: "Nota Lançada",
      },
      {
        id: 3,
        status: "viewed",
        title: "Boleto disponível para pagamento",
        description: "Boleto Bancário",
        date: "R$199.00",
        price: "Sep 30, 2023",
      },
    ],
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
