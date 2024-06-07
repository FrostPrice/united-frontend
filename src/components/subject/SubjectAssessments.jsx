import { useState } from "react";
import UploadModal from "./UploadFileModal";

const SubjectAssessments = ({ subjectAssessments }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(null);

  const openModal = (assessmentId) => {
    setSelectedAssessmentId(assessmentId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAssessmentId(null);
  };

  return (
    <div>
      <UploadModal
        isOpen={isModalOpen}
        onClose={closeModal}
        assessmentId={selectedAssessmentId}
      />
      <h2 className="text-xl font-bold mb-2">Avaliações</h2>
      <table className="min-w-full bg-white border mt-2">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nome</th>
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
              <td className="border px-4 py-2 text-center w-32">
                {new Date(assessment.dueDate).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2 text-center w-28">
                {assessment.status}
              </td>
              <td className="border px-4 py-2 text-center w-24">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => openModal(assessment.id)}
                >
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectAssessments;
