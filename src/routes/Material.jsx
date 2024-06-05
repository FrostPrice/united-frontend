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
        <td className="border px-4 py-2">
          {new Date(subject.lastNotification).toLocaleDateString()}
        </td>
        <td className="border px-4 py-2">{subject.status}</td>
        <td className="border px-4 py-2">
          <Link
            to={`/material/${subject.id}`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Detalhes
          </Link>
        </td>
      </tr>
    ));
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Material Didático</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nome</th>
            <th className="border px-4 py-2">Professor(a)</th>
            <th className="border px-4 py-2">Última Notificação</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    </div>
  );
}
export default Material;
