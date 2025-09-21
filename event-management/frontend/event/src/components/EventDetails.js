import React from "react";
import "./EventDetails.css";

const EventDetails = ({ event, goBack }) => {
  if (!event) {
    return <p className="not-found">Event not found.</p>;
  }

  return (
    <div className="event-details-container">
      <button className="back-btn" onClick={goBack}>
        ← Back
      </button>

      <div className="event-card">
        <h2 className="event-title">{event.title}</h2>
        <p className="event-description">{event.description}</p>

        <div className="event-meta">
          <div className="meta-item">
            <span className="meta-icon">📅</span>
            <span className="meta-text">Date: {event.date.split("T")[0]}</span>
          </div>

          <div className="meta-item">
            <span className="meta-icon">📍</span>
            <span className="meta-text">Venue: {event.venue}</span>
          </div>

          <div className="meta-item">
            <span className="meta-icon">👥</span>
            <span className="meta-text">Capacity: {event.capacity}</span>
          </div>

          <div className="meta-item">
            <span className="meta-icon">⚡</span>
            <span className="meta-text">
              Status:{" "}
              <span
                className={`event-status status-${event.status.toLowerCase()}`}
              >
                {event.status}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
