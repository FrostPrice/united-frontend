import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationReducer,
  },
});
