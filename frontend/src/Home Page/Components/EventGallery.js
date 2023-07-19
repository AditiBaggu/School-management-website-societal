import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import './EventGallery.css';
import { useHttpClient } from '../../Shared/Hooks/http-hook';


const EventGallery = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);

  
  const handleEventClick = (event) => {
    setActiveEvent(event);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setActiveEvent(null);
    setModalVisible(false);
  };
  const [events, setEvents] = useState([]);
  
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:4444/api/event/get"
        );
        setEvents(responseData.events);
      } catch (err) {}
    };
    fetchEvents();
  }, [sendRequest]);

  return (
    <div className="event-gallery">
      <div className="event-container">
        {events.map((events) => (
          <div className="event-item"  onClick={() => handleEventClick(events)}>
            <h2 className="event-title">{events.title}</h2>
            <div className="event-meta">
              <p className="event-date">{events.date}</p>
            </div>
          </div>
        ))}
      </div>

      <Modal
        visible={modalVisible}
        title={activeEvent && activeEvent.title}
        onCancel={handleModalClose}
        footer={null}
        id="modal"
      >
        {activeEvent && (
          <div>
            <p className="event-date">{activeEvent.date}</p>
            <p className="event-time">{activeEvent.time}</p>
            <p className="event-description">{activeEvent.description}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EventGallery;