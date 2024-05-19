import React, { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkSession } from "./store/authSlice";
import Header from "./components/Header";
import MenuSidebar from "./components/MenuSidebar";
import "./index.css";
import { fetchUser } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, loadingAuth, error } = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.user);
  const loading = loadingAuth || userState.loading;

  // Fetch user data
  useEffect(() => {
    async function fetchUserData() {
      if (!userState.userInfo && user) {
        await dispatch(fetchUser(user));
      }
    }

    fetchUserData();
  }, [dispatch, user, userState.userInfo]);

  // Used for checking the session
  useEffect(() => {
    async function fetchSession() {
      await dispatch(checkSession());
    }

    fetchSession();
  }, [dispatch, location]);

  if (loading) {
    // Mostra um spinner ou uma mensagem de carregamento enquanto a sessão é verificada
    return <div>Loading...</div>;
  }

  if (!user && error && location.pathname !== "/login") {
    // Se não estiver autenticado, redireciona para a página de login
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <div className="flex h-full">
        <MenuSidebar />
        <div className="w-full h-full m-16">
          <div className="">
            <h1 className="text-2xl font-bold mb-6">
              Olá {userState?.userInfo?.name ? userState.userInfo.name : ""}
            </h1>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
