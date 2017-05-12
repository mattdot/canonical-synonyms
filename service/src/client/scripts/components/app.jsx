import React from 'react';
import { Button, PageHeader, Navbar, Nav, NavDropdown, MenuItem,NavItem  } from 'react-bootstrap';
import { Link } from 'react-router';
import {Browse } from './browse.jsx';

export class App extends React.Component {
  render () {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Canonical Synonyms</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#/design">design</NavItem>
            <NavItem eventKey={2} href="#/improve">Improve</NavItem>
            <NavDropdown eventKey={3} title="Settings" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>API Keys</MenuItem>
              <MenuItem eventKey={3.2}>LUIS Application</MenuItem>
              <MenuItem eventKey={3.3}>Storage</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Log out</MenuItem>
            </NavDropdown>
            <NavItem><Button>Publish</Button></NavItem>
          </Nav>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
}