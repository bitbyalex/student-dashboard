import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StudentDetails = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/student/${id}`);
                setStudent(response.data);
            } catch (error) {
                console.error('Error fetching student details', error);
            }
        };

        fetchStudentDetails();
    }, [id]);

    if (!student) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{student.name}</h1>
            <p>ID: {student.id}</p>
            <p>Branch: {student.branch}</p>
            <p>Class: {student.class}</p>
            <p>Stream: {student.stream}</p>
            {/* Add more student details as needed */}
        </div>
    );
};

export default StudentDetails;
