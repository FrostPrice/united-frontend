import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser({ username, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[url('/mnt/data/image.png')]">
      <div className="bg-black bg-opacity-60 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Usuário
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="shadow appearance-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:border-gray-500 bg-transparent"
              placeholder="CPF ou Email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:border-gray-500 bg-transparent"
              placeholder="Senha"
            />
          </div>
          {error && (
            <p className="text-red-500 text-xl italic">
              {error.message || error}
            </p>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              disabled={loading}
            >
              {loading ? "Loading..." : "Entrar"}
            </button>
          </div>
          <div className="mt-4 text-center">
            <a href="#" className="text-blue-400 hover:text-blue-600 text-sm">
              Esqueceu sua senha?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
