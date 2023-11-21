import React from 'react'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'

function Bathrooms() {
  
  const bathrooms = useSelector(state => state.bathrooms.bathrooms)
  console.log(bathrooms)
  
  return (
    <div>Bathrooms</div>
  )
}

export default Bathrooms