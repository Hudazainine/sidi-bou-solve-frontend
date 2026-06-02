import React from 'react'
import './LightBlueBTN.css'

const LightBlueBTN = ({btntext, onclick}) => {
  return (
    <button className='bluelightbtn' >
      {btntext}
    </button>
  )
}

export default LightBlueBTN
