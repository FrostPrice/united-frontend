import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, fetchUser } from "../../store/userSlice";

Modal.setAppElement("#root");

const ProfileModal = ({ isOpen, onRequestClose }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const userId = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    name: userInfo.name,
    email: userInfo.email,
    telephone1: userInfo.telephone1,
    telephone2: userInfo.telephone2,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateUser({ userId, ...formData }));
    await dispatch(fetchUser(userId));
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white p-6 rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
    >
      <h2 className="text-2xl font-semibold mb-4">
        Atualizar Informações do Usuário
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nome
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Telefone 1
          </label>
          <input
            type="text"
            name="telephone1"
            value={formData.telephone1}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Telefone 2
          </label>
          <input
            type="text"
            name="telephone2"
            value={formData.telephone2}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onRequestClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProfileModal;
