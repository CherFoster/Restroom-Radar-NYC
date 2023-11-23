import React from 'react'
import {Link} from 'react-router-dom';

function NavBar() {

  return (
    <nav className='navbar'>
      <h1>WELCOME TO RESTROOM RADAR NYC</h1>
      <Link to="/">Home</Link>
      <Link to="/bathrooms">NYC Bathrooms</Link>
    </nav>
  );
}

export default NavBar;