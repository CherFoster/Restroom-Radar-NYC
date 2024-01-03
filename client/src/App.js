import React from "react";
import { useEffect} from "react";
import { useDispatch } from "react-redux"
import { setBathrooms } from "./reducers/bathroomsSlice";
import { setUser } from "./reducers/usersSlice";
import { loginSuccess, logout } from './reducers/authSlice';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Bathrooms from "./components/Bathrooms/Bathrooms";
import CreateBathroom from "./components/Bathrooms/CreateBathroom";
import BathroomDetails from "./components/Bathrooms/BathroomDetails";
import User from "./components/User/User";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Search from "./components/Bathrooms/Search";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const dispatch = useDispatch()


  useEffect(() => {
    fetch("/api/bathrooms")
    .then(res => res.json())
    .then(data => {
      dispatch(setBathrooms(data))
    })
  },[])


 
  useEffect(() => {
    fetch("/api/check_session").then((res) => {
      if (res.ok){
        res.json().then((userData) => {
          dispatch(setUser(userData)); 
          dispatch(loginSuccess(userData)); 
        });
      } else {
        dispatch(logout()); 
      }
    });
  }, [dispatch]);

  
  return(
    <Router>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bathrooms" element={<Bathrooms/>} />
      <Route path="/add-bathroom" element={<CreateBathroom/>} />
      <Route path="/bathrooms/:id" element={<BathroomDetails/>} />
      <Route path="/search" element={<Search/>} />
      <Route path="/user" element={<User/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
    </Routes>
  </Router>
  )
}

export default App;