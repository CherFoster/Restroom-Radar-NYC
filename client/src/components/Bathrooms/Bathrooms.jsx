import React from 'react'
// import { useSelector } from 'react-redux/es/hooks/useSelector'
import BathroomList from './BathroomList'

function Bathrooms() {
  
  // const bathrooms = useSelector(state => state.bathrooms.bathrooms)
  // console.log(bathrooms)
  
  return (
    <div className="container">
      <h2 className="home-header">NYC Bathrooms</h2>
      <div className="bathrooms-container">
        <BathroomList/>
      </div>
    </div>
  );
}

export default Bathrooms