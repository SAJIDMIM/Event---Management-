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

      <h2 className="event-title">{event.title}</h2>
      <p className="event-description">{event.description}</p>

      <div className="event-meta">
        <div className="meta-item">
          <span className="meta-icon">📅</span>
          <span>
            <span className="meta-label">Date: </span>
            <span className="meta-value">{event.date.split("T")[0]}</span>
          </span>
        </div>

        <div className="meta-item">
          <span className="meta-icon">📍</span>
          <span>
            <span className="meta-label">Venue: </span>
            <span className="meta-value">{event.venue}</span>
          </span>
        </div>

        <div className="meta-item">
          <span className="meta-icon">👥</span>
          <span>
            <span className="meta-label">Capacity: </span>
            <span className="meta-value">{event.capacity}</span>
          </span>
        </div>

        <div className="meta-item">
          <span className="meta-icon">⚡</span>
          <span>
            <span className="meta-label">Status: </span>
            <span className={`event-status status-${event.status.toLowerCase()}`}>
              {event.status}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
