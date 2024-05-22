// App.js

import React, { useState, useEffect } from 'react';
import './App.css';

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
  useEffect(() => {
    filterResults();
  }, [source, destination, numLanes, minRating, signals, potholes]);
  const numLanesOptions = [2, 4, 6];
  const ratingsOptions = [1, 2, 3, 4, 5];
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Simulate fetching search results (replace with actual API call)
    const dummyRoads = [
      { id: 1, name: 'Chennai-Trichy Highway', connecting: ['Chennai','Villupuram','Trichy'], ratings: 4.5, lanes: 4, signals: true, potholes: false },
      { id: 2, name: 'Chennai-Tanjore Highway', connecting: ['Chennai','Villupuram', 'Panruti','Kumbakonam','Tanjore'], ratings: 3.8, lanes: 6, signals: false, potholes: true },
      { id: 3, name: 'ECR', connecting: ['Chennai','Mayiladuthurai','Velankanni'], ratings: 4.2, lanes: 2, signals: true, potholes: true },
    ];
    // Filter search results based on attributes
    console.log(source, destination, numLanes, minRating, signals, potholes);
    // setRoads(dummyRoads);
    let searchResult = dummyRoads.filter(result =>
      result.connecting.some(connect => connect.toLowerCase().includes(source.toLowerCase())) &&
      result.connecting.some(connect => connect.toLowerCase().includes(destination.toLowerCase())));
    setRoads(searchResult);
    setFilteredResults(searchResult);
  }

  const filterResults = () => {
    console.log(minRating);
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

    return (
      <div className="container">
        <Filters numLanes={numLanes} minRating={minRating} signals={signals} potholes={potholes} numLanesOptions={numLanesOptions} ratingsOptions={ratingsOptions} handleInputChange={handleInputChange} />
        <SearchBar source={source} destination={destination} handleSearch={handleSearch} handleInputChange={handleInputChange} />
        <Results filteredResults={filteredResults} />
      </div>
  );
};

export default App;
