import React, { useState, useEffect } from "react";
import axios from "axios";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import EventDetails from "./components/EventDetails";
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
  };

  const editEventHandler = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((evt) => (evt._id === updatedEvent._id ? updatedEvent : evt))
    );
    setFilteredEvents((prev) =>
      prev.map((evt) => (evt._id === updatedEvent._id ? updatedEvent : evt))
    );
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      setEvents((prev) => prev.filter((evt) => evt._id !== id));
      setFilteredEvents((prev) => prev.filter((evt) => evt._id !== id));
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  };

  const editEvent = (event) => {
    setEventToEdit(event);
    setCurrentView("home");
  };

  const openEventDetails = (event) => {
    setSelectedEvent(event);
    setCurrentView("eventDetails");
  };

  const goBack = () => {
    setSelectedEvent(null);
    setCurrentView("events");
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
        {currentView === "eventDetails" && (
          <EventDetails event={selectedEvent} goBack={goBack} />
        )}
        {currentView === "about" && (
          <AboutUs setCurrentView={setCurrentView} currentView={currentView} />
        )}
      </main>
    </div>
  );
};

export default App;
