import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);

    useEffect(() => {
        // Fetch the students data from the server
        // Here you would replace with actual API call
        setStudents([
            { branch: 'CS', id: 1, name: 'John Doe', class: '10th', stream: 'Science' },
            { branch: 'ME', id: 2, name: 'Jane Smith', class: '10th', stream: 'Arts' },
            // Add more student data here
        ]);
    }, []);

    useEffect(() => {
        setFilteredStudents(
            students.filter(student =>
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.id.toString().includes(searchTerm)
            )
        );
    }, [searchTerm, students]);

    return (
        <div className="dashboard">
            <h1>Student Dashboard</h1>
            <input
                type="text"
                placeholder="Search by ID/Name"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <table>
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
                    {filteredStudents.map(student => (
                        <tr key={student.id}>
                            <td>{student.branch}</td>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.class}</td>
                            <td>{student.stream}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
