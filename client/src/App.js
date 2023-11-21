import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setBathrooms } from "./reducers/bathroomsSlice";
import Reviews from "./components/Reviews/Reviews";

import Bathrooms from "./components/Bathrooms/Bathrooms";

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


  return <div>
  
    <Bathrooms/>

  </div>;
}

export default App;
