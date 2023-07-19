import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import "./GETeacher.css"; // Import the CSS file for component styles
import Avatar from "../../Shared/Components/UIElements/Avatar";

const GETeachers = () => {
  const [loadedTeachers, setLoadedTeachers] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:4444/api/joshua/authentication/teacher/get/allteachers"
        );
        setLoadedTeachers(responseData.teachers);
      } catch (err) {}
    };
    fetchTeachers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedTeachers && (
        <div className="teacher-list">
          {loadedTeachers.map((teacher) => (
            <Link to={`/EditTeacher/${teacher.email}`} key={teacher._id}>
              <div className="teacher-card">
              <Avatar image={`http://localhost:4444/${teacher.image}`} alt={teacher.name}/>
                <h2>{teacher.name}</h2>
                <h2>{teacher.email}</h2>
                <p>{teacher.subjects}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default GETeachers;
