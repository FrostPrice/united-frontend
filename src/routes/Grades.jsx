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
            grades: [
                [
                    {title: 'Prova', grade: 10, weight: 5},
                    {title: 'Prova', grade: 5.5, weight: 3},
                    {title: 'Prova', grade: -1, weight: 2},
                ],
                [
                    {title: 'Prova', grade: 4.2, weight: 5},
                    {title: 'Prova', grade: 5.6, weight: 3},
                    {title: 'Prova', grade: 9, weight: 2},
                ],
                [
                    {title: 'Prova', grade: 5, weight: 5},
                    {title: 'Prova', grade: 4.5, weight: 3},
                    {title: 'Prova', grade: 6, weight: 2},
                ],
            ],
        },
        {
            title: 'Cálculo',
            professor: 'Prof. Maria Souza',
            absenceCount: 0,
            maxAbsence: 18,
            grades: [
                [
                    {title: 'Prova', grade: 10, weight: 5},
                    {title: 'Prova', grade: 5.5, weight: 3},
                    {title: 'Prova', grade: 7, weight: 2},
                ],
                [
                    {title: 'Prova', grade: 4.2, weight: 5},
                    {title: 'Prova', grade: 5.6, weight: 3},
                    {title: 'Prova', grade: 9, weight: 2},
                ],
                [
                    {title: 'Prova', grade: 5, weight: 5},
                    {title: 'Prova', grade: 4.5, weight: 3},
                    {title: 'Prova', grade: 6, weight: 2},
                ],
            ],
        },
        {
            title: 'Álgebra Linear',
            professor: 'Prof. José Pereira',
            absenceCount: 5,
            maxAbsence: 18,
            grades: [
                [
                    {title: 'Prova', grade: 10, weight: 5},
                    {title: 'Prova', grade: 5.5, weight: 3},
                    {title: 'Prova', grade: 7, weight: 2},
                ],
                [
                    {title: 'Prova', grade: 4.2, weight: 5},
                    {title: 'Prova', grade: 5.6, weight: 3},
                    {title: 'Prova', grade: 9, weight: 2},
                ],
                [
                    {title: 'Prova', grade: 5, weight: 5},
                    {title: 'Prova', grade: 4.5, weight: 3},
                    {title: 'Prova', grade: 6, weight: 2},
                ],
            ],
        },
        {
            title: 'Física',
            professor: 'Prof. Ana Santos',
            absenceCount: 0,
            maxAbsence: 18,
            grades: [
                [
                    {title: 'Prova', grade: 10, weight: 5},
                    {title: 'Prova', grade: 5.5, weight: 3},
                    {title: 'Prova', grade: 7, weight: 2},
                ],
                [
                    {title: 'Prova', grade: 4.2, weight: 5},
                    {title: 'Prova', grade: 5.6, weight: 3},
                    {title: 'Prova', grade: 9, weight: 2},
                ],
                [
                    {title: 'Prova', grade: 5, weight: 5},
                    {title: 'Prova', grade: 4.5, weight: 3},
                    {title: 'Prova', grade: 6, weight: 2},
                ],
            ],
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
