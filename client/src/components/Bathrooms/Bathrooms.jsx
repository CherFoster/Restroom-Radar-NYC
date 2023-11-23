import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'

function Bathrooms() {
  
  const bathrooms = useSelector(state => state.bathrooms.bathrooms)
  console.log(bathrooms)
  
  return (
    <div className="container">
      <h2 className="home-header">Bathrooms</h2>
      <div className="bathrooms-container">
        {/* Map through bathrooms and render bathroom cards */}
        {bathrooms.map((bathroom) => (
          <div key={bathroom.id} className="bathroom-card">
            {/* Render bathroom details here */}
            {bathroom.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bathrooms