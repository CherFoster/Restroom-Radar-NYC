import React , {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
// import { login, logout } from '../../reducers/sessionSlice';

function User() {
  const { loggedIn, currentUser } = useSelector(store => store.session);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { currentUser, loggedIn } = useContext(UserContext);


  useEffect(() => {
    if(!loggedIn) {
      navigate("/login")
    }
  }, [loggedIn, navigate])

  if(!loggedIn){ return <p>redirecting...</p> }

  const reviewCards = currentUser.reviews
  
  return (
    <div>
      <h1>My Reviews</h1>
      { reviewCards }
    </div>
  )
}

export default User

/*
I need user to log in and see the reviews they've created... many user will use many bathrooms
need to grab reviews based on id 
*/