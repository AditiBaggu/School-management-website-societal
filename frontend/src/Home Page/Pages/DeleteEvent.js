import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import { Modal } from "antd";
import "./DeleteEvent.css";
import { AuthContext } from "../../Shared/Context/Auth-context";

const DeleteEvent = () => {
  const auth = useContext(AuthContext);
  const [loadedEvents, setLoadedEvents] = useState([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:4444/api/event/get"
        );
        setLoadedEvents(responseData.events);
      } catch (err) {}
    };
    fetchEvents();
  }, [sendRequest]);

  const deleteEvents = async () => {
    try {
      await sendRequest(
        `http://localhost:4444/api/event/delete/${eventToDelete._id}`,
        "DELETE",
        null,
        {Authorization:"Bearer "+auth.token}
      );
      setLoadedEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventToDelete._id)
      );
      closeModal();
    } catch (err) {}
  };

  const openModal = (event) => {
    setEventToDelete(event);
    setIsDeleteModalVisible(true);
  };

  const closeModal = () => {
    setIsDeleteModalVisible(false);
    setEventToDelete(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedEvents && (
        <div className="deleteEvent-list">
          {loadedEvents.map((event) => (
            <div className="deleteEvent-card" key={event._id}>
              <h2>{event.title}</h2>
              <h2>{event.description}</h2>
              <h2>{event.date}</h2>
              <h2>{event.time}</h2>
              
              <button onClick={() => openModal(event)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      <Modal
        visible={isDeleteModalVisible}
        onCancel={closeModal}
        onOk={deleteEvents}
        okText="Yes"
        cancelText="No"
        
      >
        <p>Are you sure you want to delete this event?</p>
      </Modal>
    </React.Fragment>
  );
};

export default DeleteEvent;
