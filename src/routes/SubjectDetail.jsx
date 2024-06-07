import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getSubjectById} from '../store/subjectSlice';
import {useParams} from 'react-router-dom';
import SubjectInformation from '../components/subject/SubjectInformation';
import SubjectNotices from '../components/subject/SubjectNotices';
import SubjectContents from '../components/subject/SubjectContents';
import SubjectAssessments from '../components/subject/SubjectAssessments';

const SubjectDetail = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const subject = useSelector(state => state.subjects.subject);
    const subjectsStatus = useSelector(state => state.subjects.status);

    // Component Did Mount
    useEffect(() => {
        async function fetchSubject() {
            await dispatch(getSubjectById(id));
        }

        fetchSubject();
    }, [dispatch, id]);

    if (subjectsStatus === 'loading') {
        return <p>Loading...</p>;
    }

    if (subjectsStatus === 'failed') {
        return <p>Error loading data.</p>;
    }

    if (!subject || Object.keys(subject).length === 0) {
        return <p>No data available.</p>;
    }

    const professor = subject.Professor;
    const subjectContents = subject.Content;
    const subjectAssessments = subject.Assessment;
    const nextAssessmentDate = subjectAssessments.find(
        assessment => new Date(assessment.dueDate) > new Date()
    )?.dueDate;

    return (
        <div className="container mx-auto px-4 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">{subject.name}</h1>
            <SubjectInformation subject={subject} professor={professor} nextAssessmentDate={nextAssessmentDate} />
            <SubjectNotices />
            <div className="grid grid-cols-2 gap-4 bg-white shadow overflow-hidden sm:rounded-lg p-4 sm:px-6">
                <SubjectContents subjectContents={subjectContents} />
                <SubjectAssessments subjectAssessments={subjectAssessments} />
            </div>
        </div>
    );
};

export default SubjectDetail;
