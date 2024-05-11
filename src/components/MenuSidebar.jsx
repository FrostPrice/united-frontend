import '../index.css';

function MenuSidebar() {
    return (
        <aside className="w-96 h-full bg-white border-r border-zinc-300">
            <div>
                <button className="flex w-full items-center gap-4 py-4 ps-4 hover:bg-zinc-200">
                    <span className="material-symbols-rounded text-3xl">home</span>
                    <span className="text-xl">Home</span>
                </button>
                <button className="flex w-full items-center gap-4 py-4 ps-4 hover:bg-zinc-200">
                    <span className="material-symbols-rounded text-3xl">payments</span>
                    <span className="text-xl">Financeiro</span>
                </button>
                <button className="flex w-full items-center gap-4 py-4 ps-4 hover:bg-zinc-200">
                    <span className="material-symbols-rounded text-3xl">article</span>
                    <span className="text-xl">Material Didático</span>
                </button>
                <button className="flex w-full items-center gap-4 py-4 ps-4 hover:bg-zinc-200">
                    <span className="material-symbols-rounded text-3xl">calendar_month</span>
                    <span className="text-xl">Calendário</span>
                </button>
                <button className="flex w-full items-center gap-4 py-4 ps-4 hover:bg-zinc-200">
                    <span className="material-symbols-rounded text-3xl">grade</span>
                    <span className="text-xl">Notas</span>
                </button>
            </div>
        </aside>
    );
}

export default MenuSidebar;
