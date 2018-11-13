import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../Home/';
import Profile from '../Profile';

const HomeRoute = () => (
  <Home/>
);

const ProfileRoute = () => (
  <Profile/>
);

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={HomeRoute}/>
        <Route path="/profile" exact component={ProfileRoute}/>
      </div>
    );
  }
}

export default App;
