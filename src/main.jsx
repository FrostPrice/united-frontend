import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// State Management
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

// Components Routes
import App from "./App.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Material from "./routes/Material.jsx";
import Calendar from "./routes/Calendar.jsx";
import Grades from "./routes/Grades.jsx";
import Profile from "./routes/Profile.jsx";
import Notifications from "./routes/Notifications.jsx";
import Login from "./routes/Login.jsx";
import SubjectDetail from "./routes/SubjectDetail.jsx";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "/material",
        element: <Material />,
      },
      {
        path: "/material/:id",
        element: <SubjectDetail />,
      },
      {
        path: "/calendario",
        element: <Calendar />,
      },
      {
        path: "/notas",
        element: <Grades />,
      },
      {
        path: "/perfil",
        element: <Profile />,
      },
      {
        path: "/notificacoes",
        element: <Notifications />,
      },
      // TODO: Improve 404 page
      {
        path: "*",
        element: <h1>404</h1>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
