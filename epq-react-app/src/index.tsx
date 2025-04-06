import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/homePage';
import PQDetailPage from './pages/pqDetailPage';
import AboutPage from './pages/aboutPage';   
import "./index.css";
import RegistrationPage from './pages/registrationPage';
import LoginPage from './pages/loginPage';
import SearchResultsPage from './pages/searchResultsPage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path ="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path ="/pqs/:id" element={<PQDetailPage />} />
                <Route path="/search/:queryText" element={<SearchResultsPage />} />
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