import React from 'react';

function Results({ filteredResults }) {
  return <div className="results">
          {filteredResults.length > 0 ? (
          <div>
            <h2>Search Results:</h2>
            <ul>
              {filteredResults.map(result => (
                <li key={result.id}>
                  <div>Name: {result.name}</div>
                  <div>Ratings: {result.ratings}</div>
                  <div>Number of Lanes: {result.lanes}</div>
                  <div>Signals: {result.signals ? 'Yes' : 'No'}</div>
                  <div>Potholes: {result.potholes ? 'Yes' : 'No'}</div>
                </li>
              ))}
            </ul>
          </div>
          ) : (
            <p>No results found.</p>
          )}
        </div>
}

export default Results;
