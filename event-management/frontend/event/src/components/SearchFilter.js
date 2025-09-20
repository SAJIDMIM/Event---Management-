import React, { useState } from "react";
import "./SearchFilter.css";

const SearchBar = ({ events, onSearchResult }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Filter events dynamically as user types
    if (!value) {
      onSearchResult(events); // Show all if input is empty
    } else {
      const filtered = events.filter((evt) =>
        evt.title.toLowerCase().includes(value.toLowerCase())
      );
      onSearchResult(filtered);
    }
  };

  return (
    <div className="search-bar-container">
      <label className="search-label">Search:</label>
      <input
        type="text"
        placeholder="Type event title..."
        value={query}
        onChange={handleInputChange} // Live search here
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
