import '../../index.css';
import GradeAverage from './GradeAverage';

function CourseOverview({course}) {
    const {title, professor, absenceCount, maxAbsence, avgGrades} = course;
    const fixedAbsenceCount = absenceCount.toString().padStart(2, '0');

    return (
        <div className="flex flex-col gap-4 bg-white rounded-md border-2 border-zinc-300 px-4 py-2">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-lg font-bold line-clamp-1">{title}</h2>
                    <p className="text-sm text-zinc-500">{professor}</p>
                    <p className="text-sm text-zinc-500">{`Faltas: ${fixedAbsenceCount} / ${maxAbsence}`}</p>
                </div>
                <button className="flex items-center text-sm">
                    <span>Detalhes</span>
                    <span className="material-symbols-rounded">keyboard_arrow_down</span>
                </button>
            </div>
            <div className="flex bg-zinc-300">
                <div className="w-2/3 flex justify-evenly">
                    {avgGrades.map((grade, index) => (
                        <GradeAverage key={index} name={`M${index + 1}`} grade={grade} />
                    ))}
                </div>
                <div className="w-1/3">
                    <GradeAverage
                        name="Média Final"
                        grade={(
                            avgGrades.reduce((acc, grade) => {
                                if (grade === '-') return acc;
                                return acc + grade;
                            }, 0) / avgGrades.filter(grade => grade !== '-').length
                        ).toFixed(1)}
                    />
                </div>
            </div>
        </div>
    );
}

export default CourseOverview;
