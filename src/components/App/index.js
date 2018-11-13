import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from '../Home/';
import Profile from '../Profile';
import Zoo from '../Zoo';
import Airbus from '../Airbus';
import Give from '../Give';

const HomeRoute = () => (
  <Home/>
);

const ProfileRoute = () => (
  <Profile/>
);

const ZooRoute = () => (
  <Zoo/>
);

const GiveRoute = () => (
  <Give/>
);

const AirbusRoute = () => (
  <Airbus/>
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
