import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import "./GEAdmission.css"; // Import the CSS file for component styles

const GEAdmission = () => {
  const [loadedAdmissions, setLoadedAdmissions] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:4444/api/admission/get"
        );
        setLoadedAdmissions(responseData.admissions);
      } catch (err) {}
    };
    fetchAdmissions();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedAdmissions && (
        <div className="admission-list">
          {loadedAdmissions.map((admission) => (
            <Link to={`/EditAdmission/${admission._id}`} key={admission._id}>
              <div className="admission-card">
                <h2>{admission.studentName}</h2>
                <h2>{admission.fatherName}</h2>
                <h2>{admission.motherName}</h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default GEAdmission;
