import '../../index.css';

function Grade({name, grade, weight}) {
    let color;
    if (grade == -1) {
        color = 'text-zinc-500';
        grade = '-';
    } else if (grade >= 6) {
        color = 'text-green-500';
    } else {
        color = 'text-red-500';
    }

    return (
        <div className="flex flex-col">
            <span className="text-lg text-center font-bold line-clamp-3">{name}</span>
            <span className={`text-lg text-center font-bold ${color}`}>{grade}</span>
            {weight && <span className="text-sm text-center">{`Peso: ${weight}`}</span>}
        </div>
    );
}

export default Grade;
