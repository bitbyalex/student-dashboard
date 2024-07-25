import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// PrivateRoute component to protect routes based on user role
const PrivateRoute = ({ element, role, ...rest }) => {
    const isAuthenticated = localStorage.getItem('token') !== null; // Check if the user is authenticated
    const userRole = localStorage.getItem('role'); // Get the user role from local storage

    return (
        <Route
            {...rest}
            element={
                isAuthenticated && userRole === role ? (
                    element
                ) : (
                    <Navigate to="/" /> // Redirect to login if not authorized
                )
            }
        />
    );
};

export default PrivateRoute;
