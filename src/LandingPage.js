import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <header className="header">
                <h1>Welcome to Student Dashboard</h1>
                <p>Your one-stop solution for managing student data</p>
                <Link to="/login" className="login-button">Login</Link>
            </header>
            <section className="features">
                <div className="feature">
                    <h2>Manage Student Information</h2>
                    <p>Keep track of personal details, academic records, and more.</p>
                </div>
                <div className="feature">
                    <h2>Monitor Attendance</h2>
                    <p>Easily view and update student attendance records.</p>
                </div>
                <div className="feature">
                    <h2>Access Academic Results</h2>
                    <p>Check and analyze students' grades and performance.</p>
                </div>
                <div className="feature">
                    <h2>Manage Accounts</h2>
                    <p>Handle student fees, dues, and other financial details.</p>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
