import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from '../Home/';
import Profile from '../Profile';
import Muttville from '../Muttville';
import Airbus from '../Airbus';
import Give from '../Give';

import './style.css';

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const HomeRoute = () => (
  <Home/>
);

const ProfileRoute = () => (
  <Profile/>
);

const MuttVilleRoute = () => (
  <Muttville/>
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

      <Navbar className="navbar" className="custom-nav" expand="md">
          <NavbarBrand href="/">Muttville FundRaiser</NavbarBrand>
            <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
              <NavItem>
                <NavLink href="https://muttville.org/">MuttVille</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://www.airbus-sv.com/projects/8">Airbus Heritage</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/profile">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/give">Give</NavLink>
              </NavItem>
            </Nav>
        </Navbar>

        <Route path="/" exact component={HomeRoute}/>
        <Route path="/profile" exact component={ProfileRoute}/>
        <Route path="/muttville" exact component={MuttVilleRoute}/>
        <Route path="/airbus" exact component={AirbusRoute}/>
        <Route path="/give" exact component={GiveRoute}/>
      </div>
    );
  }
}

export default App;
