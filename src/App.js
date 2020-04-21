import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from '../src/components/Login';

const App = () => (
  <Router>
    <Route path='/' exact component = {Login}/>
  </Router>
)

export default App;
