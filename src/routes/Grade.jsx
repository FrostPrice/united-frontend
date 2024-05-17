import CourseOverview from '../components/grade/CourseOverview';
import GradeNotification from '../components/grade/GradeNotification';
import '../index.css';
function Grade() {
    const courses = [
        {
            title: 'Estatística',
            professor: 'Prof. João da Silva',
            absenceCount: 2,
            maxAbsence: 18,
            avgGrades: [8.5, 4, '-'],
        },
        {
            title: 'Cálculo',
            professor: 'Prof. Maria Souza',
            absenceCount: 0,
            maxAbsence: 18,
            avgGrades: [7, 6, 8],
        },
        {
            title: 'Álgebra Linear',
            professor: 'Prof. José Pereira',
            absenceCount: 5,
            maxAbsence: 18,
            avgGrades: [9, 7, 8],
        },
        {
            title: 'Física',
            professor: 'Prof. Ana Santos',
            absenceCount: 0,
            maxAbsence: 18,
            avgGrades: [8, 7, 6],
        },
    ];
    return (
        <div className="flex flex-col gap-12">
            <div className="flex justify-between gap-8">
                <GradeNotification title="Estatística - Prova M1" />
                <GradeNotification title="Estatística - Prova M1" />
                <GradeNotification title="Estatística - Prova M1" />
                <GradeNotification title="Estatística - Prova M1" />
            </div>
            <div className="grid grid-cols-3 gap-20">
                {courses.map((course, index) => (
                    <CourseOverview key={index} course={course} />
                ))}
            </div>
        </div>
    );
}

export default Grade;
