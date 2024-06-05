import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGrades } from "../store/gradesSlice";
import CourseOverview from "../components/grade/CourseOverview";
import GradeNotification from "../components/grade/GradeNotification";
import "../index.css";

const mapGradesData = (grades) => {
  const courses = {};

  grades.forEach((grade) => {
    const subjectId = grade.Enrollment.subjectId;
    const subjectName = grade.Enrollment.Subject.name;
    const professorName = grade.Enrollment.Subject.Professor.name;

    if (!courses[subjectId]) {
      courses[subjectId] = {
        title: subjectName,
        professor: professorName,
        absenceCount: grade.Enrollment.absences,
        maxAbsence: grade.Enrollment.maxAbsences,
        grades: [],
      };
    }

    const courseGrades = courses[subjectId].grades;

    // Find if the assessment already exists in the courseGrades array
    let assessmentIndex = courseGrades.findIndex(
      (assessment) => assessment.assessmentId === grade.assessmentId
    );

    if (assessmentIndex === -1) {
      // If it doesn't exist, add a new assessment
      courseGrades.push({
        assessmentId: grade.assessmentId,
        assessmentName: grade.Assessment.name,
        grades: [],
      });
      assessmentIndex = courseGrades.length - 1;
    }

    // Add the grade to the corresponding assessment
    courseGrades[assessmentIndex].grades.push({
      title: grade.Assessment.name,
      grade: grade.value,
      weight: grade.weight,
      postedDate: grade.Assessment.dueDate,
    });
  });

  // Remove assessmentId from the final structure and keep only the grades
  Object.values(courses).forEach((course) => {
    course.grades = course.grades.map((assessment) => assessment.grades);
  });

  return Object.values(courses);
};

const getLastPostedGrades = (courses, count = 4) => {
  const allGrades = [];
  courses.forEach((course) => {
    course.grades.forEach((assessmentGrades) => {
      assessmentGrades.forEach((grade) => {
        allGrades.push({
          ...grade,
          subjectName: course.title,
        });
      });
    });
  });

  allGrades.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));

  return allGrades.slice(0, count);
};

function Grade() {
  const dispatch = useDispatch();
  const grades = useSelector((state) => state.grades.items);
  const status = useSelector((state) => state.grades.status);
  const error = useSelector((state) => state.grades.error);

  // Component Did Mount
  useEffect(() => {
    async function fetchData() {
      await dispatch(getGrades());
    }

    fetchData();
  }, [dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  const courses = mapGradesData(grades);
  const lastPostedGrades = getLastPostedGrades(courses);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between gap-8">
        {lastPostedGrades.map((grade, index) => (
          <GradeNotification
            key={index}
            title={`${grade.subjectName} - ${grade.title}`}
          />
        ))}
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
