// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import Results from './components/Results';
import RoadReviewDialog from './components/RoadReviewDialog';
import Login from './components/Login';
import getRoads from './controller';

function App(){
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [numLanes, setNumLanes] = useState('');
  // const [numLanesOptions, setNumLanesOptions] = useState([2,4,6]);
  const [minRating, setMinRating] = useState(0);
  const [signals, setSignals] = useState(false);
  const [potholes, setPotholes] = useState(false);
  const [roads, setRoads] = useState([]);
  // const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    filterResults();
  }, [source, destination, numLanes, minRating, signals, potholes]);
  const numLanesOptions = [2, 4, 6];
  const ratingsOptions = [1, 2, 3, 4, 5];
  
  const handleLogin = (username) => {
    setUser(username);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await getRoads();
      // Filter search results based on attributes
      console.log(source, destination, numLanes, minRating, signals, potholes);
      // setRoads(dummyRoads);
      const allRoads = response.data.roads;
      let searchResult = allRoads.filter(result =>
        result.connecting.some(connect => connect.toLowerCase().includes(source.toLowerCase())) &&
        result.connecting.some(connect => connect.toLowerCase().includes(destination.toLowerCase())));
      setRoads(searchResult);
      setFilteredResults(searchResult);
    } catch (e) {
      console.error('Error: Unable to get the roads list');
      console.error(e);
    }
  }

  const filterResults = () => {
    let filtered = roads.filter(result =>
      result.connecting.some(connect => connect.toLowerCase().includes(source.toLowerCase())) &&
      result.connecting.some(connect => connect.toLowerCase().includes(destination.toLowerCase())) &&
      (numLanes ? result.lanes === parseInt(numLanes) : true) &&
      result.ratings >= minRating &&
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
      } else if (name === 'numLanes') {
        setNumLanes(value);
      } else if (name === 'minRating') {
        setMinRating(parseFloat(value));
      }
    }
  };

  const handleRoadReviewSubmit = (rating) => {
    console.log('rating', rating);
    // Handle road review submission, update state with the rating
    setIsDialogOpen(false); // Close the dialog box after submitting
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false); // Close the dialog box
  };

  const handleReviewRoad = () => {
    setIsDialogOpen(true); // Open the dialog box when "Review a road" button is clicked
  };

  return (
    <div className={`container ${isDialogOpen ? 'modal-open' : ''}`}>
      <div className="content-wrapper">
        {user ? (
        <div>
          <h2>Welcome, {user}!</h2>
          <button onClick={() => setUser(null)}>Logout</button>
          <div className="filters-wrapper">
            <Filters
              numLanes={numLanes}
              minRating={minRating}
              signals={signals}
              potholes={potholes}
              numLanesOptions={numLanesOptions}
              ratingsOptions={ratingsOptions}
              handleInputChange={handleInputChange}
              className="filters"
            />
          </div>
          <div className="search-results-wrapper">
            <div className="search-bar">
              <SearchBar
                source={source}
                destination={destination}
                handleSearch={handleSearch}
                handleInputChange={handleInputChange}
                className="search-input"
              />
              <button onClick={handleReviewRoad} className="search-button">Review a road</button>
            </div>
            <Results filteredResults={filteredResults} className="results" />
          </div>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
      </div>
      {isDialogOpen && (
        <div className="modal-background">
          <RoadReviewDialog
            isOpen={isDialogOpen}
            onClose={handleDialogClose}
            onSubmit={handleRoadReviewSubmit}
            className="road-review-dialog"
          />
        </div>
      )}
    </div>
  );
};

export default App;
