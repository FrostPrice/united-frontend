import '../../index.css';

function GradeNotification({title}) {
    return (
        <div className='w-72 h-20 bg-white rounded-md border-2 border-zinc-300 px-4 py-2'>
            <span className='text-xs text-zinc-500'>NOTA LANÇADA</span>
            <h2 className='text-xl font-bold line-clamp-1'>{title}</h2>
        </div>
    );
}

export default GradeNotification;