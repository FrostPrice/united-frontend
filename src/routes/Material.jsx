import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSubjects } from "../store/subjectSlice";
import { Link } from "react-router-dom";

function Material() {
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subjects.subjects);
  const status = useSelector((state) => state.subjects.status);
  const error = useSelector((state) => state.subjects.error);

  // Component Did Mount
  useEffect(() => {
    async function fetchSubjects() {
      await dispatch(getSubjects());
    }

    fetchSubjects();
  }, [dispatch]);

  const subjectStatus = (status) => {
    if (status === "active") return "Ativo";

    return "Inativo";
  };

  let content;

  if (status === "loading") {
    content = (
      <tr>
        <td>Loading...</td>
      </tr>
    );
  } else if (status === "succeeded") {
    content = subjects.map((subject) => (
      <tr key={subject.id}>
        <td className="border px-4 py-2">{subject.name}</td>
        <td className="border px-4 py-2">{subject.Professor.name}</td>
        <td className="border px-4 py-2 text-center">
          {new Date(subject.lastNotification).toLocaleDateString()}
        </td>
        <td className="border px-4 py-2 text-center">
          {subjectStatus(subject.status)}
        </td>
        <td className="border px-4 py-2 text-center">
          <Link
            to={`/material/${subject.id}`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 inline-block rounded"
          >
            Acessar Detalhes
          </Link>
        </td>
      </tr>
    ));
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-4 border rounded-md bg-white">
      <h1 className="text-2xl font-bold mb-4">Material Didático</h1>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Matéria</th>
            <th className="border px-4 py-2">Professor(a)</th>
            <th className="border px-4 py-2 w-44">Última Notificação</th>
            <th className="border px-4 py-2 w-32">Status</th>
            <th className="border px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    </div>
  );
}
export default Material;
