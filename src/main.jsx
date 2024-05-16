import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import Dashboard from './routes/Dashboard.jsx';
import './index.css'
import Material from './routes/Material.jsx';
import Calendar from './routes/Calendar.jsx';
import Grade from './routes/Grade.jsx';
import Profile from './routes/Profile.jsx';

const router = createBrowserRouter([{
    path: '/',
    element: <App/>,
    children: [
        {
            path: '',
            element: <Dashboard/>
        },
        {
            path: '/material',
            element: <Material/>
        },
        {
            path: '/calendario',
            element: <Calendar/>
        },
        {
            path: '/notas',
            element: <Grade/>
        },
        {
            path: '/perfil',
            element: <Profile/>
        }
    ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
