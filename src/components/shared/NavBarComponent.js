import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export const NavBarComponent = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/characters" className="nav-link" activeClassName="active">
            Characters
          </NavLink>
          <NavLink to="/libraries" className="nav-link" activeClassName="active">
            Libraries
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
