import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import FindPickUp from './components/FindPickUp';
import BootstrapNavBar from './components/BootstrapNavBar';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import MyEvents from './components/MyEvents';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={BootstrapNavBar} />
          <Route exact path="/" component={FindPickUp}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/myevents" component={MyEvents} />
        </div> 
      </Router>
    );
  }
}

export default App;
