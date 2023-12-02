import React from 'react'
import {Link} from 'react-router-dom';

function NavBar() {

  return (
    <nav className='navbar'>
      <h1>WELCOME TO RESTROOM RADAR NYC</h1>
      <Link to="/">Home</Link>
      <Link to="/bathrooms">NYC Bathrooms</Link>
      <Link to="/add-bathroom">Add New Bathrooms</Link>
      <Link to="/user">User</Link>
    </nav>
  );
}

export default NavBar;

// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import { setSession } from '../reducers/sessionSlice';
// import { useDispatch, useSelector } from "react-redux";

// function NavBar() {
//   const dispatch = useDispatch()
//   const login = useSelector(state => state.login.login)

//   const [currentUser, setCurrentUser] = useState(null)
//   const [loggedIn, setLoggedIn] = useState(false)

//   const navigate = useNavigate();

//   const logout = () => {
//     fetch('/api/logout', {
//       method: 'DELETE'
//     }).then(() => {
//       setCurrentUser(null);
//       setLoggedIn(false);
//       navigate("/")
//     });
//   }


//   const displayedLinks = loggedIn ? <>
//   <nav className='navbar'>
//       <Link to="/">Restroom Radar NYC</Link>
//       <Link to="/bathrooms">NYC Bathrooms</Link>
//       <Link to="/add-bathroom">Add a New Bathroom</Link>
//       <Link to="/" onClick={logout}>Log Out</Link>
//   </nav>
//   </>:<>
//   <nav>
//       <Link to="/signup">Sign Up</Link>
//       <br/>
//       <Link to="/login">Log In</Link>
//   </nav>
//   </>
  
//   return (
//     <nav className='navbar'>
//       <h1>WELCOME  {currentUser ? currentUser.username : 'GUEST'} TO RESTROOM RADAR NYC</h1>
//       {displayedLinks}
//     </nav>
//   );
// }

// export default NavBar;