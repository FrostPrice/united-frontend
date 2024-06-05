import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationSlice";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import eventsReducer from "./eventsSlice";
import subjectsReducer from "./subjectSlice";
import professorsReducer from "./professorSlice";
import contentsReducer from "./contentsSlice";
import assessmentsReducer from "./assessmentSlice";
import gradesReducer from "./gradesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationReducer,
    user: userReducer,
    events: eventsReducer,
    subjects: subjectsReducer,
    professors: professorsReducer,
    contents: contentsReducer,
    assessments: assessmentsReducer,
    grades: gradesReducer,
  },
});
