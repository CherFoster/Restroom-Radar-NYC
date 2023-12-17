import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../reducers/authSlice';

function NavBar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    fetch("/api/logout", {
        method: "DELETE"
    }).then((res) => {
        if (res.ok) {
            dispatch(logout());
        }
    });
}

  const displayedLinks = isAuthenticated ? (
    <>
      <Link to="/">Restroom Radar NYC</Link>
      <Link to="/bathrooms">NYC Bathrooms</Link>
      <Link to="/add-bathroom">Add a New Bathroom</Link>
      <Link to="/user">{user.username} Reviews</Link>
      <Link to="/" onClick={handleLogout}>Log Out</Link>
    </>
  ) : (
    <>
      <Link to="/signup">Sign Up</Link>
      <br />
      <Link to="/login">Log In</Link>
    </>
  );

  return (
    <nav className='navbar'>
      <h1>WELCOME  {user ? user.username : 'GUEST'} TO RESTROOM RADAR NYC</h1>
      {displayedLinks}
    </nav>
  );
}

export default NavBar;