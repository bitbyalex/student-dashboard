import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async (query) => {
        try {
            const response = await axios.post('http://localhost:5001/search', { query });
            setResults(response.data);
        } catch (error) {
            console.error('Error searching for students', error);
        }
    };

    const handleRowClick = (id) => {
        navigate(`/student/${id}`);
    };

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <SearchBar onSearch={handleSearch} />
            {results.length > 0 && (
                <table className="results-table">
                    <thead>
                        <tr>
                            <th>Branch</th>
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <th>Class</th>
                            <th>Stream</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map(result => (
                            <tr key={result.id} onClick={() => handleRowClick(result.id)}>
                                <td>{result.branch}</td>
                                <td>{result.id}</td>
                                <td>{result.name}</td>
                                <td>{result.class}</td>
                                <td>{result.stream}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Dashboard;
