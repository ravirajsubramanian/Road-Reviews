import React, { useState, useEffect } from 'react';

import './App.css';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import Results from './components/Results';
import RoadReviewDialog from './components/RoadReviewDialog';
import Login from './components/Login';
import { getRoads, submitReview } from './controller';

function App(){
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [minNumLanes, setMinNumLanes] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [signals, setSignals] = useState(false);
  const [potholes, setPotholes] = useState(false);
  const [roads, setRoads] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRoad, setSelectedRoad] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    filterResults();
  }, [source, destination, minNumLanes, minRating, signals, potholes, roads]);

  const minNumLanesOptions = [2, 4, 6];
  const ratingsOptions = [1, 2, 3, 4, 5];
  const placesOptions = ["Chennai", "Vellore", "Krishnagiri", "Hosur", "Bengaluru", "Chengalpattu", "Tindivanam", "Perambalur", "Trichy", "Mahabalipuram", "Puducherry"];
  
  const handleLogin = (username) => {
    setUser(username);
  };

  const handleSearch = async (e = null) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    try {
      const response = await getRoads();
      // Filter search results based on attributes
      console.log(source, destination, minNumLanes, minRating, signals, potholes);
      const allRoads = response.data.roads;
      let searchResult = allRoads.filter(result =>
        result.connecting.some(connect => connect.toLowerCase().includes(source.toLowerCase())) &&
        result.connecting.some(connect => connect.toLowerCase().includes(destination.toLowerCase())));
      setRoads(searchResult);
      filterResults(searchResult);
    } catch (e) {
      console.error('Error: Unable to get the roads list');
      console.error(e);
    }
  }

  const filterResults = (roadsToFilter = roads) => {
    let filtered = roadsToFilter.filter(result =>
      result.lanes >= minNumLanes &&
      result.rating >= minRating &&
      (!signals || result.signals) &&
      (!potholes || result.potholes)
    );
    setFilteredResults(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'signals') {
        setSignals(checked);
      } else if (name === 'potholes') {
        setPotholes(checked);
      }
    } else {
      if (name === 'source') {
        setSource(value);
      } else if (name === 'destination') {
        setDestination(value);
      } else if (name === 'minNumLanes') {
        setMinNumLanes(value);
      } else if (name === 'minRating') {
        setMinRating(parseFloat(value));
      }
    }
  };

  const handleRoadReviewSubmit = async (rating) => {
    try {
      const response = await submitReview(selectedRoad, rating, "sample review");
      console.log(response);
      setSelectedRoad(0);
      setIsDialogOpen(false); // Close the dialog box after submitting
      handleSearch();
    } catch (error) {
      console.error('Error: Failed to submit review');
      console.error(error);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false); // Close the dialog box
  };

  const handleReviewRoad = (road_id) => {
    setSelectedRoad(road_id)
    setIsDialogOpen(true);
  };

  return (
    <div className={`container ${isDialogOpen ? 'modal-open' : ''}`}>
      {user ? (
        <div className="flex-column grid-layout">
          <header className="header">
            <div className="search-bar">
              <SearchBar
                source={source}
                destination={destination}
                handleSearch={handleSearch}
                handleInputChange={handleInputChange}
                placesOptions={placesOptions}
                className="search-input"
                />
            </div>
            <span>
              <button onClick={() => setUser(null)} className="button button-danger">Logout</button>
            </span>
          </header>
          <div className="sidebar">
            <Filters
              minNumLanes={minNumLanes}
              minRating={minRating}
              signals={signals}
              potholes={potholes}
              minNumLanesOptions={minNumLanesOptions}
              ratingsOptions={ratingsOptions}
              handleInputChange={handleInputChange}
              className="filters"
            />
          </div>
          <div className="results">
            {/* <div className="card"> */}
              <Results className="results" filteredResults={filteredResults} handleReviewRoad={handleReviewRoad} />
            {/* </div> */}
          </div>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
      {isDialogOpen && (
        <div className="modal-background">
          <RoadReviewDialog
            selectedRoad={selectedRoad}
            isOpen={isDialogOpen}
            onClose={handleDialogClose}
            onSubmit={(rating) => handleRoadReviewSubmit(rating)}
            className="road-review-dialog"
          />
        </div>
      )}
    </div>
  );
};

export default App;
