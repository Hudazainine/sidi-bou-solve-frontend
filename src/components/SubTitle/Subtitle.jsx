import React from 'react'
import './Subtitle.css'

const Subtitle = ({logosrc,headertitle}) => {
  return (
    <div className='subtitle'>
      <img src={logosrc} alt="subtitle_Icon" />
      {headertitle}
    </div>
  )
}

export default Subtitle
