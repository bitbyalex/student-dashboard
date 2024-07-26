import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext'; // Import AuthContext
import LoginForm from './LoginForm'; // Import the new LoginForm component

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Use the AuthContext

    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginUser(username, password); // Call the login function
    };

    const loginUser = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5001/login', { username, password });
            localStorage.setItem('token', response.data.token);
            const decodedToken = JSON.parse(atob(response.data.token.split('.')[1]));
            
            // Create user data including the role
            const userData = {
                id: decodedToken.id,
                username: decodedToken.username,
                role: decodedToken.role, // Assuming the role is included in the token
            };
            
            // Set user data in AuthContext
            login(userData);

            // Redirect based on user role
            if (decodedToken.role === 'admin') {
                navigate('/login/admin'); // Redirect to Admin Dashboard
            } else {
                navigate('/login/dashboard'); // Redirect to User Dashboard or another page
            }
        } catch (error) {
            setError('Error logging in');
        }
    };

    return (
        <LoginForm 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            error={error}
            handleSubmit={handleSubmit}
        />
    );
};

export default Login;
