import './index.css';
import Header from './components/Header';
import MenuSidebar from './components/MenuSidebar';

function App() {
    return (
        <>
            <Header />
            <div className="h-full">
                <MenuSidebar />
            </div>
        </>
    );
}

export default App;
