import React from 'react';

function SearchBar({ source, destination, handleSearch, handleInputChange, placesOptions }) {
  return (
    <div className="content">
      <div>
        <label htmlFor="source">Source:</label>
        <select 
          className="search-input"
          id="source"
          name="source"
          value={source}
          onChange={handleInputChange}>
            {placesOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
      </div>
      <div>
        <label htmlFor="destination">Destination:</label>
        <select 
          className="search-input"
          id="destination"
          name="destination"
          value={destination}
          onChange={handleInputChange}>
          {placesOptions.filter((option) => option !== source).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
          </select>
      </div>
      <button onClick={handleSearch} className="search-button">Search</button>
    </div>
  );
}

export default SearchBar;
