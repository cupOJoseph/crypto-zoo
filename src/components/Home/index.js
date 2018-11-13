import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import './style.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
// <NavLink href="/">Getting Started</NavLink>
  // <li><Link to="/">Home</Link></li>
  // <li><Link to="/profile">Profiles</Link></li>

  render() {
    return (
      <div className="App">
      <Navbar className="navbar" color="light" light expand="md">
          <NavbarBrand href="/">Nifty Zoo</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink><Link to="/profile">Profile</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="">National Zoo</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="">Airbus Heritage</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="">Give</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  My Zoo
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>

        <div className="image"></div>

        <div className="placeholder-info">
          <h2>About</h2>
        </div>

      </div>
    );
  }
}

export default App;
