import React, { useState } from "react";
import "./SearchFilter.css";

const SearchBar = ({ events, onSearchResult }) => {
  const [query, setQuery] = useState("");

  const handleSearchClick = () => {
    if (!query) {
      onSearchResult(events); // Show all if empty
    } else {
      const filtered = events.filter((evt) =>
        evt.title.toLowerCase().includes(query.toLowerCase())
      );
      onSearchResult(filtered);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchClick();
    }
  };

  return (
    <div className="search-bar-container">
      <label className="search-label">Search:</label>
      <input
        type="text"
        placeholder="Type event title..."
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleEnterPress}
        className="search-input"
      />
      <button className="search-btn" onClick={handleSearchClick}>
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
