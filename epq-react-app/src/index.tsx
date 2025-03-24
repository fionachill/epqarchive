import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/homePage';
import PQDetailPage from './pages/pqDetailPage';   
import "./index.css";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path ="/" element={<HomePage />} />
                <Route path ="/pqs/:id" element={<PQDetailPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);