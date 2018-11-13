import React, { Component } from 'react';

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

  render() {
    return (
      <div className="App">
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

        <div className="image"></div>

        <div className="placeholder-info">
        </div>

      </div>
    );
  }
}

export default App;
