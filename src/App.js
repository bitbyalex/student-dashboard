import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import LandingPage from './LandingPage';
import Dashboard from './Components/Dashboard';

const App = () => {
    const isLoggedIn = localStorage.getItem('token'); // Check if user is logged in
    return (
        <Router>
            <div>
                <Routes>
                  <Route path='/' element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path='/login/dashboard' element={isLoggedIn ? <Dashboard /> : <Navigate to="/login"/>} />
                    {/* Add more routes here */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
