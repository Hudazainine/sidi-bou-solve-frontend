import React from 'react'
import './Socialbtn.css'

const Socialbtn = ({btnimage,btntext, Onclick}) => {
  return (
    <button className='btnhove' onclick={Onclick} >
        <img src={btnimage} alt="" /> {btntext}
    </button>
  )
}

export default Socialbtn
