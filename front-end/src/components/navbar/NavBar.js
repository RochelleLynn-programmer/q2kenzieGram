import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
export default function NavBar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav activeKey="/">
            <Nav.Item>
              <NavLink activeStyle={{ color: "#17a2b8" }} className="nav-item" to="/">
                Upload Image
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink activeStyle={{ color: "#17a2b8" }} className="nav-item" to="/photos">
                Photos
              </NavLink>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
