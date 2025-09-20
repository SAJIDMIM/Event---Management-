import React from "react";
import "./EventDetails.css";

const EventDetails = ({ event, goBack }) => {
  if (!event) return <p>Event not found.</p>;

  return (
    <div className="event-details-container">
      <button className="back-btn" onClick={goBack}>
        ← Back
      </button>
      <div className="event-details-card">
        <h2 className="event-title">{event.title}</h2>
        <p className="event-info">
          <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="event-info">
          <strong>Venue:</strong> {event.venue}
        </p>
        <p className="event-info">
          <strong>Capacity:</strong> {event.capacity}
        </p>
        <p className={`event-status status-${event.status || "draft"}`}>
          <strong>Status:</strong> {event.status || "Draft"}
        </p>
        <p className="event-description">{event.description}</p>
      </div>
    </div>
  );
};

export default EventDetails;
