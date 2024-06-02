import React from 'react';

function SearchBar({ source, destination, handleSearch, handleInputChange }) {
  return <div className="content">
          <h1>Search for Roads</h1>
            <form onSubmit={handleSearch}>
              <div className="search-inputs">
                <div>
                  <label htmlFor="source">Source:</label>
                  <input
                    type="text"
                    id="source"
                    name="source"
                    value={source}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="destination">Destination:</label>
                  <input
                    type="text"
                    id="destination"
                    name="destination"
                    value={destination}
                    onChange={handleInputChange}
                  />
                  </div>
                </div>
              <button type="submit">Search</button>
            </form>
          </div>;
}

export default SearchBar;
