/* eslint-disable */
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { listLogEntries } from './API'

function App() {
  const [logEntries, setLogEntries] = useState([]);
  
  useEffect(() => {
    fetch(`http://localhost:1337/api/logs`).then(response => {
     return response.json()
    }).then(data => {
      setLogEntries(data.results);
    })
  }, [])
  

  return (
    <ul>
    {logEntries.map(entry => {
     return <li key={entry.id}>{entry.title}</li>
    })}
    </ul>
  );
}

export default App;
