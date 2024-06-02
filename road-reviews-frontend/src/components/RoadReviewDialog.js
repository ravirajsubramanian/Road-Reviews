import React, { useState } from 'react';

function RoadReviewDialog({ isOpen, onClose, onSubmit, handleDialogClose }) {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value));
  };

  const handleSubmit = () => {
    onSubmit(rating);
    setRating(0); // Reset rating after submission
  };

  if (!isOpen) {
    return null; // Don't render if the dialog is not open
  }

  return (
    <div className="modal-overlay">
        <div className="modal-content">
          <span className="close" onClick={handleDialogClose}>&times;</span>
          <h2>Rate the road</h2>
          <label>
            Rating:
            <select value={rating} onChange={handleRatingChange}>
              {[0, 1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
  );
}

export default RoadReviewDialog;
