import React from 'react';

function Filters({ numLanes, minRating, signals, potholes, numLanesOptions, ratingsOptions, handleInputChange }) {
  return <div className="sidebar">
          <div className="filters">
            <h2>Filters</h2>
            <div>
              <label htmlFor="numLanes">Number of Lanes:</label>
              <select id="numLanes" name="numLanes" value={numLanes} onChange={handleInputChange}>
                {numLanesOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
            <label htmlFor="minRating">Minimum Rating:</label>
              <select id="minRating" name="minRating" value={minRating} onChange={handleInputChange}>
                {ratingsOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
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
            <div>
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
        </div>;
}

export default Filters;
