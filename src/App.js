import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Login from './Login';
import LandingPage from './LandingPage';
import Dashboard from './Components/Dashboard';
import StudentDetails from './StudentDetails';
import Reservation from './Components/Reservation';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <ThemeProvider theme={theme}>
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> {/* Pass setIsLoggedIn */}
                    <Route path="/reservation" element={<Reservation />} />
                    <Route path="/login/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
                    <Route path="/student/:id" element={isLoggedIn ? <StudentDetails /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
        </ThemeProvider>
    );
};

export default App;
