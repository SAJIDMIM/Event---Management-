import React, { useState, useEffect } from "react";
import axios from "axios";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import AboutUs from "./components/AboutUs";
import SearchBar from "./components/SearchFilter";
import logo from "./assets/images.png";

const App = () => {
  const [currentView, setCurrentView] = useState("home");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch events
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);
      setFilteredEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const addEvent = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
    setFilteredEvents((prev) => [...prev, newEvent]);
    alert(`✅ "${newEvent.title}" added successfully!`);
  };

  const editEventHandler = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((evt) => (evt._id === updatedEvent._id ? updatedEvent : evt))
    );
    setFilteredEvents((prev) =>
      prev.map((evt) => (evt._id === updatedEvent._id ? updatedEvent : evt))
    );
    setSelectedEvent(updatedEvent);
    alert(`✏️ "${updatedEvent.title}" updated successfully!`);
  };

  const deleteEvent = async (id) => {
    const eventToDelete = events.find((evt) => evt._id === id);
    const confirmed = window.confirm(
      `🗑️ Do you really want to delete "${eventToDelete.title}"?`
    );

    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      setEvents((prev) => prev.filter((evt) => evt._id !== id));
      setFilteredEvents((prev) => prev.filter((evt) => evt._id !== id));
      if (selectedEvent?._id === id) setSelectedEvent(null);
      alert(`✅ "${eventToDelete.title}" deleted successfully!`);
    } catch (err) {
      console.error("Failed to delete event:", err);
      alert("❌ Failed to delete event. Please try again.");
    }
  };

  const editEvent = (event) => {
    setEventToEdit(event);
    setCurrentView("home"); // Open EventForm
  };

  const openEventDetails = (event) => {
    setSelectedEvent(event);
    setCurrentView("eventDetail");
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
            onClick={(e) => {
              e.preventDefault();
              setEventToEdit(null);
              setSelectedEvent(null);
              setCurrentView("home");
            }}
          >
            Home
          </a>
          <a
            href="#events"
            className={currentView === "events" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setSelectedEvent(null);
              setCurrentView("events");
            }}
          >
            Event List
          </a>
          <a
            href="#about"
            className={currentView === "about" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setCurrentView("about");
            }}
          >
            About Us
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, paddingTop: "20px", minHeight: "calc(100vh - 80px)" }}>
        {currentView === "home" && (
          <EventForm
            editEvent={editEventHandler}
            eventToEdit={eventToEdit}
            setCurrentView={setCurrentView}
            addEvent={addEvent}
          />
        )}

        {currentView === "events" && (
          <>
            <SearchBar events={events} onSearchResult={setFilteredEvents} />
            <EventList
              events={filteredEvents}
              deleteEvent={deleteEvent}
              editEvent={editEvent}
              setCurrentView={setCurrentView}
              currentView={currentView}
              openEventDetails={openEventDetails}
            />
          </>
        )}

        {currentView === "eventDetail" && selectedEvent && (
          <div className="event-details-container">
            <button
              className="back-btn"
              onClick={() => setCurrentView("events")}
            >
              ← Back
            </button>
            <div className="event-details-card">
              <h2 className="event-title">{selectedEvent.title}</h2>
              <p className="event-description">{selectedEvent.description}</p>
              <div className="event-meta">
                <div className="meta-item">
                  <div className="meta-icon date">📅</div>
                  <div className="meta-content">
                    <span className="meta-label">Date</span>
                    <span className="meta-value">
                      {selectedEvent.date.split("T")[0]}
                    </span>
                  </div>
                </div>
                <div className="meta-item">
                  <div className="meta-icon venue">📍</div>
                  <div className="meta-content">
                    <span className="meta-label">Venue</span>
                    <span className="meta-value">{selectedEvent.venue}</span>
                  </div>
                </div>
                <div className="meta-item">
                  <div className="meta-icon capacity">👥</div>
                  <div className="meta-content">
                    <span className="meta-label">Capacity</span>
                    <span className="meta-value">{selectedEvent.capacity}</span>
                  </div>
                </div>
                <div className="meta-item">
                  <div className="meta-icon status">⚡</div>
                  <div className="meta-content">
                    <span className="meta-label">Status</span>
                    <span
                      className={`event-status status-${selectedEvent.status.toLowerCase()}`}
                    >
                      {selectedEvent.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === "about" && (
          <AboutUs setCurrentView={setCurrentView} currentView={currentView} />
        )}
      </main>
    </div>
  );
};

export default App;
