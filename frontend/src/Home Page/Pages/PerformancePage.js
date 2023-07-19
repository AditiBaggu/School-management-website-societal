import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useHttpClient } from '../../Shared/Hooks/http-hook';
import './PerformancePage.css'; // Import the CSS file

const PerformancePage = () => {
  const [students, setStudents] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { classNumber } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:4444/api/grading/getByClass/${classNumber}`
        );
        const sortedStudents = responseData.grades.sort((a, b) =>
          a.rollNumber.localeCompare(b.rollNumber, undefined, { numeric: true })
        );

        setStudents(sortedStudents);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStudents();
  }, [classNumber, sendRequest]);

  return (
    <div className="performance-page">
      <h1 className="performance-page-title">Student Performance</h1>
      <table className="performance-table">
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Name</th>
            <th>Subjects</th>
            <th>Total Marks</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.rollNumber}</td>
              <td>{student.studentName}</td>
              <td>
                {student.subjects.map((subject, subIndex) => (
                  <div key={subIndex}>
                    {subject.subjectName}: {subject.marksObtained} / {subject.maxMarks}
                  </div>
                ))}
              </td>
              <td>{student.totalMarks}</td>
              <td>{student.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PerformancePage;
