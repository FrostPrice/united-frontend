import { Link } from 'react-router-dom';
import '../index.css';

function MenuSidebar() {
    return (
        <aside className="w-96 h-full">
            <div>
                <Link to={''} className="flex w-full items-center gap-4 py-4 ps-4 hover:bg-zinc-200">
                    <span className="material-symbols-rounded text-3xl">home</span>
                    <span className="text-xl">Home</span>
                </Link>
                <button disabled="true" className="flex w-full items-center gap-4 py-4 ps-4 bg-zinc-300">
                    <span className="material-symbols-rounded text-3xl">payments</span>
                    <span className="text-xl">Financeiro</span>
                </button>
                <Link to={'material'} className="flex w-full items-center gap-4 py-4 ps-4 hover:bg-zinc-200">
                    <span className="material-symbols-rounded text-3xl">article</span>
                    <span className="text-xl">Material Didático</span>
                </Link>
                <Link to={'calendario'} className="flex w-full items-center gap-4 py-4 ps-4 hover:bg-zinc-200">
                    <span className="material-symbols-rounded text-3xl">calendar_month</span>
                    <span className="text-xl">Calendário</span>
                </Link>
                <Link to={'notas'} className="flex w-full items-center gap-4 py-4 ps-4 hover:bg-zinc-200">
                    <span className="material-symbols-rounded text-3xl">grade</span>
                    <span className="text-xl">Notas</span>
                </Link>
            </div>
        </aside>
    );
}

export default MenuSidebar;
