import React from "react";
import "./AboutUs.css";
import logo from "../assets/images.png";

const AboutUs = ({ setCurrentView, currentView }) => {
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
            EventList
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

      {/* About Us Content */}
      <div className="about-container">
        <h2>About Us</h2>
        <div className="about-content">
          <p>
            Welcome to the Event Management App! Here, you can effortlessly create, edit, and manage all your events in one place.
          </p>
          <p>
            This application is built using React and demonstrates modern UI design, state management, and responsive component-based architecture for a seamless user experience.
          </p>
          <p>
            This app was developed specifically for <strong>Gamage Recruiters (Pvt) Ltd</strong> to efficiently manage events and improve operational workflows.
          </p>
          <p>
            Our goal is to simplify event planning and ensure that managing your events is both intuitive and enjoyable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
