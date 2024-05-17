import '../../index.css';

function GradeAverage({name, grade}) {
    let color;
    if (grade === '-') {
        color = 'text-zinc-500';
    } else if (grade >= 6) {
        color = 'text-green-500';
    } else {
        color = 'text-red-500';
    }

    return (
        <div className="flex flex-col">
            <span className="text-lg text-center font-bold">{name}</span>
            <span className={`text-lg text-center font-bold ${color}`}>{grade}</span>
        </div>
    );
}

export default GradeAverage;
