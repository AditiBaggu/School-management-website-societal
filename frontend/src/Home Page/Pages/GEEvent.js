import React, { useState, useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import "./GEEvent.css"; // Import the CSS file for component styles
import Avatar from "../../Shared/Components/UIElements/Avatar";

const GEEvent = () => {
  const [loadedEvents, setLoadedEvents] = useState([]);
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

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedEvents && (
        <div className="event-list">
          {loadedEvents.map((event) => (
             <Link to={`/EditEvent/${event._id}`} key={event._id}>
            <div className="event-card" key={event._id}>
              <h2>{event.title}</h2>
              <h2>{event.description}</h2>
              <h2>{event.date}</h2>
              <h2>{event.time}</h2>
              
              
            </div>
            </Link>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default GEEvent;
