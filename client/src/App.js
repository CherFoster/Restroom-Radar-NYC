import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setBathrooms } from "./reducers/bathroomsSlice";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Bathrooms from "./components/Bathrooms/Bathrooms";
import CreateBathroom from "./components/Bathrooms/CreateBathroom"
import User from "./components/User/User"
import Home from "./components/Home"
import NavBar from "./components/NavBar"


function App() {
  const bathrooms = useSelector(state => state.bathrooms.bathrooms)
  const dispatch = useDispatch()
  
  useEffect(() => {
    fetch("/api/bathrooms")
    .then(res => res.json())
    .then(data => {
      dispatch(setBathrooms(data))
    })
  },[])


  return(
    <Router>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bathrooms" element={<Bathrooms/>} />
      <Route path="/add-bathroom" element={<CreateBathroom/>} />
      <Route path="/user" element={<User/>}/>
    </Routes>
  </Router>
  )
}

export default App;
