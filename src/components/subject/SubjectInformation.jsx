import {format} from 'date-fns';
import {ptBR} from 'date-fns/locale';

const SubjectInformation = ({subject, professor, nextAssessmentDate}) => {
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4 sm:px-6">
            <h2 className="text-xl font-bold mb-2">Informações da Disciplina</h2>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Professor: {professor.name}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">E-mail: {professor.email}</p>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Período: {subject.period}</p>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Ano/Semestre: {subject.yearSemester}</p>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Status: {subject.status}</p>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {nextAssessmentDate && <>Próxima Avaliação: {format(nextAssessmentDate, 'd, MMMM', {locale: ptBR})}</>}
            </p>
        </div>
    );
};

export default SubjectInformation;
