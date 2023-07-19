import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import { Modal } from "antd";
import "./DeleteTeacher.css";
import { AuthContext } from "../../Shared/Context/Auth-context";

const DeleteTeacher = () => {
  const auth = useContext(AuthContext);
  const [loadedTeachers, setLoadedTeachers] = useState([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);
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

  const deleteTeacher = async () => {
    try {
      await sendRequest(
        `http://localhost:4444/api/joshua/authentication/teacher/delete/${teacherToDelete.email}`,
        "DELETE",null,{Authorization:"Bearer "+auth.token}
      );
      setLoadedTeachers((prevTeachers) =>
        prevTeachers.filter((teacher) => teacher.email !== teacherToDelete.email)
      );
      closeModal();
    } catch (err) {}
  };

  const openModal = (teacher) => {
    setTeacherToDelete(teacher);
    setIsDeleteModalVisible(true);
  };

  const closeModal = () => {
    setIsDeleteModalVisible(false);
    setTeacherToDelete(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedTeachers && (
        <div className="deleteTeacher-list">
          {loadedTeachers.map((teacher) => (
            <div className="deleteTeacher-card" key={teacher._id}>
              <h2>{teacher.name}</h2>
              <h2>{teacher.email}</h2>
              <p>{teacher.subjects}</p>
              <button onClick={() => openModal(teacher)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      <Modal
        visible={isDeleteModalVisible}
        onCancel={closeModal}
        onOk={deleteTeacher}
        okText="Yes"
        cancelText="No"
        
      >
        <p>Are you sure you want to delete this teacher?</p>
      </Modal>
    </React.Fragment>
  );
};

export default DeleteTeacher;
