import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import MenuSidebar from './components/MenuSidebar';
import './index.css';

function App() {
    return (
        <>
            <Header />
            <div className="flex h-full bg-gray-100">
                <MenuSidebar />
                <div className='w-full h-full m-16'>
                    <Outlet/>
                </div>
            </div>
        </>
    );
}

export default App;
