import '../index.css';
import united_logo from '../assets/image/united_logo.png';
import profile_picture from '../assets/image/profile_picture.jpg';

function Header() {
    return (
        <header className="h-24 bg-white px-8 py-2 border-b border-zinc-300 grid grid-cols-3 items-center">
            <div className="h-20">
                <img src={united_logo} className="h-full" />
            </div>
            <div className="h-10 w-full flex items-center border border-zinc-200 rounded-xl">
                <span className="material-symbols-rounded text-zinc-400 mx-2">search</span>
                <input type="text" className="grow me-2" placeholder="O que quer pesquisar hoje?" />
            </div>

            <div className="flex justify-end items-center gap-2">
                <button className="w-12 rounded-md hover:bg-zinc-200 px-2 aspect-square">
                    <span className="material-symbols-rounded text-zinc-400 text-3xl align-middle">mail</span>
                </button>
                <button className="w-12 rounded-md hover:bg-zinc-200 px-2 aspect-square">
                    <span className=" material-symbols-rounded text-zinc-400 text-3xl align-middle">notifications</span>
                </button>
                <button className="w-16 rounded-md hover:bg-zinc-200 px-2 aspect-square">
                    <img className="material-symbols-rounded text-zinc-400 text-5xl align-middle rounded-full" src={profile_picture} />
                </button>
            </div>
        </header>
    );
}

export default Header;
