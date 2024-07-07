import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/login', {username, password});
            localStorage.setItem('token', response.data.token);
            setError('');
            // Redirect to dashboard or another page
            console.log('Login sucessful');
        } catch (err) {
            setError('Invalid username or password');
            console.log('Login failed',err);
        }
    };

    console.log('Rendering Login component');
    
    return (
        <div className="login-container">
        <h2 className="login-header">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="login-button">Login</button>
        </form>
    </div>
    );
};

export default Login;