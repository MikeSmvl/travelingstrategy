import React from 'react';
import { Navbar as RBNavbar } from 'react-bootstrap/';
import logo from '../../logo.png';

function Navbar() {
  return (
    <div>
      <RBNavbar variant="dark" style={{ backgroundColor: 'transparent' }}>
      <RBNavbar.Brand href="#home">
        <img
          alt=""
          src={logo}
          width="45"
          height="45"
          className="d-inline-block align-top"
        />
        <RBNavbar.Text style={{ color: 'white' }}>
          Traveling Strategy
        </RBNavbar.Text>
      </RBNavbar.Brand>
      <RBNavbar.Collapse className="justify-content-end">
        <RBNavbar.Text>
          <a href="#login">Login</a>
        </RBNavbar.Text>
      </RBNavbar.Collapse>
    </RBNavbar>
  </div>
  )
}

export default Navbar