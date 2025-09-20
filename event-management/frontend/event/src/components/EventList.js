import React, { useRef } from "react";
import "./EventList.css";
import logo from "../assets/images.png";

const EventList = ({
  events,
  deleteEvent,
  editEvent,
  setCurrentView,
  currentView,
  openEventDetails, // New prop for single event details
}) => {
  const gridRef = useRef(null);

  const scroll = (direction) => {
    if (gridRef.current) {
      const scrollAmount = 300; // You can adjust
      gridRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="logo" />
          <h1>Event Management</h1>
        </div>
        <nav className="navbar-right">
          <a
            href="#home"
            className={currentView === "home" ? "active" : ""}
            onClick={(e) => { e.preventDefault(); setCurrentView("home"); }}
          >
            Home
          </a>
          <a
            href="#events"
            className={currentView === "events" ? "active" : ""}
            onClick={(e) => { e.preventDefault(); setCurrentView("events"); }}
          >
            Event List
          </a>
          <a
            href="#about"
            className={currentView === "about" ? "active" : ""}
            onClick={(e) => { e.preventDefault(); setCurrentView("about"); }}
          >
            About Us
          </a>
        </nav>
      </header>

      {/* Event List */}
      <div className="event-list-container" style={{ paddingTop: "120px" }}>
        <h2 className="event-list-title">All Events</h2>

        {events.length === 0 ? (
          <p className="no-events">No events available.</p>
        ) : (
          <>
            {/* Horizontal Scrollable Event Cards */}
            <div className="events-grid" ref={gridRef}>
              {events.map((event) => (
                <div
                  className="event-card"
                  key={event._id}
                  onClick={() => openEventDetails(event)}
                  style={{ cursor: "pointer" }}
                >
                  <h3 className="event-name">{event.title}</h3>
                  <p className="event-detail">
                    <strong>Date:</strong> {event.date.split("T")[0]}
                  </p>
                  <p className="event-detail">
                    <strong>Venue:</strong> {event.venue}
                  </p>
                  <p className="event-detail">
                    <strong>Capacity:</strong> {event.capacity}
                  </p>
                  <p className={`event-detail status-${(event.status || "draft").toLowerCase()}`}>
                    <strong>Status:</strong> {event.status || "Draft"}
                  </p>
                  <div className="event-actions">
                    <button
                      className="edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        editEvent(event);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteEvent(event._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll buttons below the cards */}
            <div className="scroll-arrows-container">
              <button className="scroll-arrow" onClick={() => scroll("left")}>
                &#8592;
              </button>
              <button className="scroll-arrow" onClick={() => scroll("right")}>
                &#8594;
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventList;
