/* eslint-disable */
import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import LogEntryForm from './LogEntryForm'
import { listLogEntries } from './API'

function App() {
  const [logEntries, setLogEntries] = useState([]);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 2
  });
  const [showPopup, setPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState({});

  // equiv of componentdidmount
  useEffect(() => {
    fetch(`http://localhost:1337/api/logs`).then(response => {
      return response.json()
    }).then(data => {
      setLogEntries(data.results);
    })
  }, [])

  let showAddMarkerPopup = (event) => {
    // Destructuring an array. lngLat is an array with values [longitude, latitude]
    const [longitude, latitude] = event.lngLat;

    setAddEntryLocation({
      longitude,
      latitude
    });

  }

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(viewport) => setViewport(viewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onDblClick={showAddMarkerPopup}
    >
      {
        logEntries.map(entry => (
          <>
            <Marker key={entry._id} latitude={entry.latitude} longitude={entry.longitude}>
              <div onClick={() => {
                setPopup({
                  [entry._id]: true
                })
              }}>
                <svg
                  className="marker"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round" >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </Marker>
            {
              showPopup[entry._id] && (
                <Popup
                  longitude={entry.longitude}
                  latitude={entry.latitude}
                  closeButton={true}
                  closeOnClick={true}
                  onClose={() => {
                    setPopup({})
                  }}>
                  <div className="popup">
                    <h3>{entry.title}</h3>
                    <p>{entry.comments}</p>
                    <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                  </div>
                </Popup>
              )
            }
          </>
        ))
      }
      {
        addEntryLocation.longitude && (
          <>
          <Marker latitude={addEntryLocation.latitude} longitude={addEntryLocation.longitude}>
              <div>
                <svg
                  className="markerNew"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round" >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </Marker>
            <Popup
              longitude={addEntryLocation.longitude}
              latitude={addEntryLocation.latitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => {
                setAddEntryLocation({})
              }}>
              <div className="popup">
                <LogEntryForm location ={addEntryLocation}/>
            </div>
            </Popup>
          </>
        )
      }
    </ReactMapGL>
  );
}

export default App;
