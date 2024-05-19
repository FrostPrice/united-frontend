import { Link, useLocation, useNavigate } from "react-router-dom";
import "../index.css";
import united_logo from "../assets/image/united_logo.png";
import profile_picture from "../assets/image/profile_picture.jpg";
import { logoutUser } from "../store/authSlice";
import { useSelector, useDispatch } from "react-redux";

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, user, error } = useSelector((state) => state.auth);

  const logoutUserHandler = async () => {
    await dispatch(logoutUser());

    if (loading) {
      // Mostra um spinner ou uma mensagem de carregamento enquanto a sessão é verificada
      return <div>Loading...</div>;
    }

    if (!user && !error && location.pathname !== "/login") {
      // Se não estiver autenticado, redireciona para a página de login
      navigate("/login");
    }
  };

  return (
    <header className="h-24 bg-white px-8 py-2 border-b border-zinc-300 grid grid-cols-3 items-center">
      <div className="h-20">
        <img src={united_logo} className="h-full" />
      </div>
      <div className="h-10 w-full flex items-center border border-zinc-200 rounded-xl">
        <span className="material-symbols-rounded text-zinc-400 mx-2">
          search
        </span>
        <input
          type="text"
          className="grow me-2"
          placeholder="O que quer pesquisar hoje?"
        />
      </div>

      <div className="flex justify-end items-center gap-2">
        <Link
          to={"notificacoes"}
          className="w-12 rounded-md hover:bg-zinc-200 px-2 aspect-square"
        >
          <span className=" material-symbols-rounded text-zinc-400 text-3xl align-middle">
            notifications
          </span>
        </Link>
        <Link
          to={"perfil"}
          className="w-16 rounded-md hover:bg-zinc-200 px-2 aspect-square"
        >
          <img
            className="material-symbols-rounded text-zinc-400 text-5xl align-middle rounded-full"
            src={profile_picture}
          />
        </Link>
        <button
          className="flex items-center space-x-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={logoutUserHandler}
          disabled={loading}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
