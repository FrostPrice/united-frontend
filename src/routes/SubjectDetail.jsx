import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSubjectById } from "../store/subjectSlice";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const SubjectDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const subject = useSelector((state) => state.subjects.subject);
  const subjectsStatus = useSelector((state) => state.subjects.status);

  // Component Did Mount
  useEffect(() => {
    async function fetchSubject() {
      await dispatch(getSubjectById(id));
    }

    fetchSubject();
  }, [dispatch, id]);

  if (subjectsStatus === "loading") {
    return <p>Loading...</p>;
  }

  if (subjectsStatus === "failed") {
    return <p>Error loading data.</p>;
  }

  if (!subject || Object.keys(subject).length === 0) {
    return <p>No data available.</p>;
  }

  const professor = subject.Professor;
  const subjectContents = subject.Content;
  const subjectAssessments = subject.Assessment;
  const nextAssessmentDate = subjectAssessments.find(
    (assessment) => new Date(assessment.dueDate) > new Date()
  )?.dueDate;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">{subject.name}</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Professor: {professor.name}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            E-mail: {professor.email}
          </p>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Período: {subject.period}
          </p>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Ano/Semestre: {subject.yearSemester}
          </p>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Status: {subject.status}
          </p>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {nextAssessmentDate && (
              <>
                Próxima Avaliação:{" "}
                {format(nextAssessmentDate, "d, MMMM", { locale: ptBR })}
              </>
            )}
          </p>
        </div>
      </div>
      <div className="mb-4">
        {/* TODO */}
        <h2 className="text-xl font-bold">Mural de Avisos</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan,
          turpis at hendrerit consectetur, nibh enim semper enim, vel eleifend
          ex lacus sed dolor.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold">Conteúdos</h2>
          <table className="min-w-full bg-white border mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Última Alteração</th>
                <th className="border px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {subjectContents.length === 0 && (
                <tr>
                  <td>Nenhum Conteúdo Postado</td>
                </tr>
              )}
              {subjectContents.map((content) => (
                <tr key={content.id}>
                  <td className="border px-4 py-2">{content.name}</td>
                  <td className="border px-4 py-2">
                    {new Date(content.lastModified).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2 className="text-xl font-bold">Avaliações</h2>
          <table className="min-w-full bg-white border mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Data Limite</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {subjectAssessments.length === 0 && (
                <tr>
                  <td>Nenhuma Avaliação Cadastrada</td>
                </tr>
              )}
              {subjectAssessments.map((assessment) => (
                <tr key={assessment.id}>
                  <td className="border px-4 py-2">{assessment.name}</td>
                  <td className="border px-4 py-2">
                    {new Date(assessment.dueDate).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{assessment.status}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetail;
