import GradeNotification from '../components/grade/GradeNotification';
import '../index.css'
function Grade() {
    return (
        <div>
            <div className='flex gap-8'>
                <GradeNotification title='Estatística - Prova M1'/>
                <GradeNotification title='Estatística - Prova M1'/>
                <GradeNotification title='Estatística - Prova M1'/>
                <GradeNotification title='Estatística - Prova M1'/>
            </div>
        </div>
    );
}

export default Grade;