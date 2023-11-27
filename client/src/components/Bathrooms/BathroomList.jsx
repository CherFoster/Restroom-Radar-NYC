import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'

function BathroomList() {

  const bathrooms = useSelector(state => state.bathrooms.bathrooms)

  return (
    <div>{/* Map through bathrooms and render bathroom cards */}
    {bathrooms.map((bathroom) => (
      <div key={bathroom.id} className="bathroom-card">
        {/* Render bathroom details here */}
        <h2>{bathroom.bathroom_name} </h2> 
        <p>Address: {bathroom.street_num} {bathroom.street_name}</p>
        <p>City: {bathroom.city}</p>
        <p>Zip code: {bathroom.zip_code}</p>
      </div>
    ))}</div>
  )
}

export default BathroomList