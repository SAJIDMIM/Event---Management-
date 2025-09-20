import React from "react";
import "./EventDetails.css";

const EventDetails = ({ event, goBack }) => {
  if (!event) return <p className="not-found">Event not found.</p>;

  return (
    <div className="event-details-container">
      <button className="back-btn" onClick={goBack}>
        ← Back to Events
      </button>

      <div className="event-details-card">
        <h2 className="event-title">{event.title}</h2>
        <p className="event-description">{event.description}</p>

        <div className="event-meta">
          <p>
            <span className="meta-icon">📅</span>
            <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
          </p>
          <p>
            <span className="meta-icon">📍</span>
            <strong>Venue:</strong> {event.venue}
          </p>
          <p>
            <span className="meta-icon">👥</span>
            <strong>Capacity:</strong> {event.capacity}
          </p>
          <p>
            <span className="meta-icon">⚡</span>
            <strong>Status:</strong>{" "}
            <span className={`event-status status-${event.status || "draft"}`}>
              {event.status || "Draft"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
