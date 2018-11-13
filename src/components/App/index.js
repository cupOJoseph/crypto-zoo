import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from '../Home/';
import Profile from '../Profile';
import Zoo from '../Zoo';
import Airbus from '../Airbus';
import Give from '../Give';

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

      <Navbar className="navbar" color="light" light expand="md">
          <NavbarBrand href="/">Nifty Zoo</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/national-zoo">National Zoo</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/airbus">Airbus Heritage</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/give">Give</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/profile">My Zoo</NavLink>
              </NavItem>
            </Nav>
        </Navbar>

        <Route path="/" exact component={HomeRoute}/>
        <Route path="/profile" exact component={ProfileRoute}/>
        <Route path="/national-zoo" exact component={ZooRoute}/>
        <Route path="/airbus" exact component={AirbusRoute}/>
        <Route path="/give" exact component={GiveRoute}/>
      </div>
    );
  }
}

export default App;
