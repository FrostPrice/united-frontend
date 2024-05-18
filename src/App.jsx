import React, { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkSession } from "./store/authSlice";
import Header from "./components/Header";
import MenuSidebar from "./components/MenuSidebar";
import "./index.css";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkSession());
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
            <h1 className="text-2xl font-bold mb-6">Olá Cleiton Prange</h1>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
