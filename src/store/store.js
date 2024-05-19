import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationSlice";
import authReducer from "./authSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationReducer,
    user: userReducer,
  },
});
