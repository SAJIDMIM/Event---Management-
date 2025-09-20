import React, { useState, useEffect } from "react";
import "./EventForm.css";
import axios from "axios";

const EventForm = ({ editEvent, eventToEdit, setCurrentView, addEvent }) => {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    capacity: "",
    status: "draft",
  });

  useEffect(() => {
    if (eventToEdit) setEvent(eventToEdit);
  }, [eventToEdit]);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure capacity is a proper integer
    const eventData = {
      ...event,
      capacity: parseInt(event.capacity.toString().trim(), 10),
    };

    try {
      if (eventToEdit) {
        const res = await axios.put(
          `http://localhost:5000/api/events/${eventToEdit._id}`,
          eventData
        );
        editEvent(res.data);
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/events",
          eventData
        );
        addEvent(res.data);
      }

      // Reset form
      setEvent({
        title: "",
        description: "",
        date: "",
        venue: "",
        capacity: "",
        status: "draft",
      });

      setCurrentView("events");
    } catch (err) {
      console.error("Error saving event:", err.response?.data || err.message);
      alert("Failed to save event. Check console for details.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="event-card">
        <h2 className="center-title">
          {eventToEdit ? "Update Event" : "Create an Event"}
        </h2>
        <p className="subtitle center-subtitle">
          Plan and organize your events with ease
        </p>

        <div className="form-group">
          <label>Title</label>
          <div className="input-wrapper">
            <span className="icon">📝</span>
            <input
              type="text"
              name="title"
              value={event.title}
              onChange={handleChange}
              placeholder="Enter event title"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <div className="input-wrapper">
            <span className="icon">🗒️</span>
            <input
              type="text"
              name="description"
              value={event.description}
              onChange={handleChange}
              placeholder="Enter description"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Date</label>
          <div className="input-wrapper">
            <span className="icon">📅</span>
            <input
              type="date"
              name="date"
              value={event.date ? event.date.split("T")[0] : ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Venue</label>
          <div className="input-wrapper">
            <span className="icon">📍</span>
            <input
              type="text"
              name="venue"
              value={event.venue}
              onChange={handleChange}
              placeholder="Enter venue"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Capacity</label>
          <div className="input-wrapper">
            <span className="icon">👥</span>
            <input
              type="number"
              name="capacity"
              value={event.capacity}
              onChange={handleChange}
              placeholder="Enter capacity"
              min="1"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Status</label>
          <div className="input-wrapper">
            <span className="icon">⚡</span>
            <select
              name="status"
              value={event.status}
              onChange={handleChange}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn">
          {eventToEdit ? "Save Changes" : "Add Event"}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
