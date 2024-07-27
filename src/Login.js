import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import LoginForm from './LoginForm';
import {jwtDecode} from 'jwt-decode'; // Correct import without curly braces

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginUser(username, password);
    };

    const loginUser = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5001/login', { username, password });
            console.log('Response Data:', response.data);

            if (!response.data.token || typeof response.data.token !== 'string') {
                throw new Error("Invalid token received");
            }

            localStorage.setItem('token', response.data.token);
            console.log('Stored Token:', localStorage.getItem('token'));

            const decodedToken = jwtDecode(response.data.token);
            console.log('Decoded Token:', decodedToken);

            // Create user data including the role
            const userData = {
                id: decodedToken.id,
                username: decodedToken.username,
                role: decodedToken.role, // Assuming the role is included in the token
            };

            // Set user data in AuthContext
            login(response.data.token); // Update login to take token as argument
            login(userData); // Also update context with userData

            // Redirect based on user role
            if (decodedToken.role === 'admin') {
                navigate('/login/admin');
            } else {
                navigate('/login/dashboard');
            }
        } catch (error) {
            setError('Error logging in. Please check your username and password.');
            console.error(error);
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
