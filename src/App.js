import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import LandingPage from './LandingPage';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                  <Route path='/' element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                    {/* Add more routes here */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
