/* eslint-disable */
import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './API'

function App() {
  const [logEntries, setLogEntries] = useState([]);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  // equiv of componentdidmount
  useEffect(() => {
    fetch(`http://localhost:1337/api/logs`).then(response => {
      return response.json()
    }).then(data => {
      setLogEntries(data.results);
    })
  }, [])


  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(viewport) => setViewport(viewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
      {
        logEntries.map(entry => (
          <Marker key={entry._id} latitude={entry.latitude} longitude={entry.longitude}>
            <svg
              className="marker"
              viewBox="0 0 24 24"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round" >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
            </svg>
          </Marker>
        ))
      }
        <Popup 
        longitude={0} 
        latitude={0} 
        closeButton={false} 
        closeOnClick={false}>
           <div>Hi There</div>
        </Popup>
    </ReactMapGL>
  );
}

export default App;
