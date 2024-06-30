import React from 'react';

function Results({ filteredResults, handleReviewRoad }) {
  return (
    <div className="results">
      {filteredResults.length > 0 ? (
        <div>
          <h2>Search Results:</h2>
          <ul className="results-list">
            {filteredResults.map(result => (
              <li key={result.id} className="result-item">
                <div className="result-name">{result.name}</div>
                <div className="result-ratings">Ratings: {result.rating}/5</div>
                <div className="result-lanes">Number of Lanes: {result.lanes}</div>
                <div className="result-signals">Signals: {result.signals ? 'Yes' : 'No'}</div>
                <div className="result-potholes">Potholes: {result.potholes ? 'Yes' : 'No'}</div>
                <button className="button button-primary review-button" onClick={() => handleReviewRoad(result.id)}>Add your review</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default Results;
