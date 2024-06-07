import {useState} from 'react';
import Grade from './Grade';

function CourseOverview({course}) {
    const {title, professor, absenceCount, maxAbsence, grades} = course;
    const fixedAbsenceCount = absenceCount.toString().padStart(2, '0');

    // Calculate average grades
    const avgGrades = grades.map(grade => {
        let finished = true;
        const sum = grade.reduce((acc, {grade, weight}) => {
            if (grade === -1) {
                finished = false;
                return;
            }
            return acc + grade * weight;
        }, 0);
        if (!finished) {
            return -1;
        }
        const totalWeight = grade.reduce((acc, {weight}) => acc + weight, 0);
        return parseFloat((sum / totalWeight).toFixed(1));
    });

    // Check if all grades are finished
    let finalAvgFinished = true;
    if (avgGrades.includes(-1)) {
        finalAvgFinished = false;
    }
    let finalAvg = -1;
    if (finalAvgFinished) {
        finalAvg = (avgGrades.reduce((acc, grade) => acc + grade, 0) / avgGrades.length).toFixed(1);
    }

    const [active, setActive] = useState(false);

    return (
        <div className="h-fit flex flex-col gap-4 bg-white rounded-md border-2 border-zinc-300 px-4 py-2">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-lg font-bold line-clamp-1">{title}</h2>
                    <p className="text-sm text-zinc-500">{professor}</p>
                    <p className="text-sm text-zinc-500">{`Faltas: ${fixedAbsenceCount} / ${maxAbsence}`}</p>
                </div>
                <button className="flex items-center text-sm" onClick={() => setActive(!active)}>
                    <span>Detalhes</span>
                    <span className="material-symbols-rounded">
                        {active ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                    </span>
                </button>
            </div>
            <div className="flex bg-zinc-300">
                <div className="w-2/3 flex">
                    {avgGrades.map((grade, index) => (
                        <div key={index} className="grow">
                            <Grade key={index} name={`M${index + 1}`} grade={grade} />
                        </div>
                    ))}
                </div>
                <div className="w-1/3">
                    <Grade name="Média Final" grade={finalAvg} />
                </div>
            </div>
            <div className={`${active ? 'flex' : 'hidden'} flex-col gap-4 bg-zinc-300 p-2`}>
                {grades.map((grade, index) => (
                    <div key={`a${index}`} className="flex">
                        <span key={`b${index}`} className="w-12 font-bold text-center content-center">{`M${
                            index + 1
                        }`}</span>
                        <div key={`c${index}`} className="grid grid-cols-3 gap-4 grow">
                            {grade.map(({title, grade, weight}, index) => (
                                <Grade key={index} name={title} grade={grade} weight={weight.toFixed(1)} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseOverview;
