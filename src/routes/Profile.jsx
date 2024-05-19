import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/userSlice";
import profile_picture from "../assets/image/profile_picture.jpg";
import ProfileModal from "../components/profile/ProfileModal";

function Profile() {
  const dispatch = useDispatch();
  const { userInfo, status } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      if (user) await dispatch(fetchUser(user));
    }

    fetchUserData();
  }, [dispatch, user]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    return <div>No user data</div>;
  }

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="p-8 mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
        <div className="flex-1 space-y-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-inner max-w-2xl self-start">
            <h2 className="text-2xl font-semibold mb-4">
              Informações do usuário
            </h2>
            <div className="space-y-4">
              <div className="flex">
                <label className="font-medium mr-4">Nome de usuário:</label>
                <span className="font-semibold">{userInfo.name}</span>
              </div>
              <div className="flex">
                <label className="font-medium mr-4">E-mail:</label>
                <span className="font-semibold">{userInfo.email}</span>
              </div>
              <div className="flex">
                <label className="font-medium mr-4">Telefone 1:</label>
                <span className="font-semibold">{userInfo.telephone1}</span>
              </div>
              <div className="flex">
                <label className="font-medium mr-4">Telefone 2:</label>
                <span className="font-semibold">{userInfo.telephone2}</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-inner max-w-2xl self-start">
            <h2 className="text-2xl font-semibold mb-4">
              Informações do curso
            </h2>
            <div className="space-y-4">
              <div className="flex">
                <label className="font-medium mr-4">Período:</label>
                <span className="font-semibold">
                  {userInfo.currentPeriod}/{userInfo.totalPeriods}
                </span>
              </div>
              <div className="flex">
                <label className="font-medium mr-4">Status:</label>
                <span className="font-semibold">{userInfo.status}</span>
              </div>
              <div className="flex">
                <label className="font-medium mr-4">Curso:</label>
                <span className="font-semibold">{userInfo.course}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4 self-start">
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={profile_picture}
              alt="Profile"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-200 disabled:cursor-not-allowed"
            disabled
          >
            Mudar foto
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
            onClick={openModal}
          >
            Atualizar Cadastro
          </button>
        </div>
      </div>
      <ProfileModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
}

export default Profile;
