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
  const [selectedEvent, setSelectedEvent] = useState(null); // For single-event details

  // Fetch events
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);
      setFilteredEvents(res.data); // Initially show all
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
  };

  const editEventHandler = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((evt) => (evt._id === updatedEvent._id ? updatedEvent : evt))
    );
    setFilteredEvents((prev) =>
      prev.map((evt) => (evt._id === updatedEvent._id ? updatedEvent : evt))
    );
    setSelectedEvent(updatedEvent); // Update detail view if open
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      setEvents((prev) => prev.filter((evt) => evt._id !== id));
      setFilteredEvents((prev) => prev.filter((evt) => evt._id !== id));
      if (selectedEvent?._id === id) setSelectedEvent(null);
    } catch (err) {
      console.error("Failed to delete event:", err);
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
              openEventDetails={openEventDetails} // Pass the function
            />
          </>
        )}

        {currentView === "eventDetail" && selectedEvent && (
          <div className="event-detail-container" style={{ padding: "20px" }}>
            <h2>{selectedEvent.title}</h2>
            <p><strong>Date:</strong> {selectedEvent.date.split("T")[0]}</p>
            <p><strong>Venue:</strong> {selectedEvent.venue}</p>
            <p><strong>Capacity:</strong> {selectedEvent.capacity}</p>
            <p><strong>Status:</strong> {selectedEvent.status}</p>
            <p><strong>Description:</strong> {selectedEvent.description}</p>
            <button
              className="edit-btn"
              onClick={() => {
                editEvent(selectedEvent); // Go to edit form
              }}
            >
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => {
                deleteEvent(selectedEvent._id);
                setCurrentView("events");
              }}
            >
              Delete
            </button>
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
