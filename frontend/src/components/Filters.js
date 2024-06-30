import React from 'react';

function Filters({ minNumLanes, minRating, signals, potholes, minNumLanesOptions, ratingsOptions, handleInputChange }) {
  return (
    <div className="filters">
      <h2>Filters</h2>
      <div className="filter-group">
        <label htmlFor="minNumLanes">Number of Lanes:</label>
        <select id="minNumLanes" name="minNumLanes" value={minNumLanes} onChange={handleInputChange} className="input">
          {minNumLanesOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="minRating">Minimum Rating:</label>
        <select id="minRating" name="minRating" value={minRating} onChange={handleInputChange} className="input">
          {ratingsOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>
          <input
            type="checkbox"
            name="signals"
            checked={signals}
            onChange={handleInputChange}
          />
          Signals
        </label>
      </div>
      <div className="filter-group">
        <label>
          <input
            type="checkbox"
            name="potholes"
            checked={potholes}
            onChange={handleInputChange}
          />
          Potholes
        </label>
      </div>
    </div>
  );
}

export default Filters;
