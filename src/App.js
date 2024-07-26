import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Login from './Login';
import { AuthProvider, AuthContext } from './contexts/AuthContext'; // Import AuthContext
import LandingPage from './LandingPage';
import Dashboard from './components/Dashboard';
import StudentDetails from './StudentDetails';
import Reservation from './components/Reservation';
import AdminDashboard from './components/AdminDashboard';

const PrivateRoute = ({ element, role }) => {
    const { user } = React.useContext(AuthContext); // Get user info from AuthContext

    // Check if user is authenticated and has the required role
    const isAuthenticated = user !== null && user.role === role;

    return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider> {/* Wrap the application in AuthProvider */}
                <Router>
                    <div>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/reservation" element={<Reservation />} />
                            <Route path="/login/admin" element={<PrivateRoute element={<AdminDashboard />} role="admin" />} /> {/* Protect admin route */}
                            <Route path="/login/dashboard" element={<PrivateRoute element={<Dashboard />} role="user" />} /> {/* Protect dashboard */}
                            <Route path="/student/:id" element={<PrivateRoute element={<StudentDetails />} role="user" />} /> {/* Protect student details */}
                        </Routes>
                    </div>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
