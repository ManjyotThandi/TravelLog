/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Map from "./Map";
import HomePage from "./HomePage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/log">
          <Map />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
