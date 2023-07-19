import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import "./GEStudent.css"; // Import the CSS file for component styles
import { Link } from "react-router-dom";
const GEStudent = () => {
  const [loadedStudents, setLoadedStudents] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:4444/api/students/allStudents"
        );
        setLoadedStudents(responseData.students);
      } catch (err) {}
    };
    fetchStudents();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedStudents && (
        <div className="student-list">
          {loadedStudents.map((student) => (
            <Link to={`/EditStudent/${student._id}`} key={student._id}>
            <div className="student-card" key={student._id}>
              <h2>{student.studentName}</h2>
              <h2>{student.classNumber}</h2>
              <h2>{student.fatherName}</h2>
              <h2>{student.motherName}</h2>
              <h2>{student.rollNumber}</h2>
              
            </div>
            </Link>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default GEStudent;
