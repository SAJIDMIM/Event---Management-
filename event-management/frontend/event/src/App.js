import React, { useState, useEffect } from "react";
import axios from "axios";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import AboutUs from "./components/AboutUs"; // Import the modern AboutUs
import logo from "./assets/images.png";

const App = () => {
  const [currentView, setCurrentView] = useState("home");
  const [events, setEvents] = useState([]);
  const [eventToEdit, setEventToEdit] = useState(null);

  // Fetch events
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const addEvent = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
  };

  const editEventHandler = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((evt) => (evt._id === updatedEvent._id ? updatedEvent : evt))
    );
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      setEvents((prev) => prev.filter((evt) => evt._id !== id));
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  };

  const editEvent = (event) => {
    setEventToEdit(event);
    setCurrentView("home"); // Go to form for editing
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

      {/* Main content */}
      <main style={{ flex: 1, paddingTop: "20px", minHeight: "calc(100vh - 80px)" }}>
        {currentView === "home" && (
          <EventForm
            editEvent={editEventHandler}
            eventToEdit={eventToEdit}
            setCurrentView={setCurrentView}
            currentView={currentView}
            addEvent={addEvent}
          />
        )}
        {currentView === "events" && (
          <EventList
            events={events}
            deleteEvent={deleteEvent}
            editEvent={editEvent}
            setCurrentView={setCurrentView}
            currentView={currentView}
          />
        )}
        {currentView === "about" && <AboutUs setCurrentView={setCurrentView} currentView={currentView} />}
      </main>
    </div>
  );
};

export default App;
