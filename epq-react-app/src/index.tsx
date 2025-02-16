import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import HomePage from './pages/homePage';   


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path ="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)