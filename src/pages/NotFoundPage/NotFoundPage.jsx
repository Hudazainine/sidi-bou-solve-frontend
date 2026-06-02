import React from 'react'
import './NotFoundPage.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/logov2.svg'

const NotFoundPage = () => {
  return (
    <div>
      <div className="notfoundcontainer padding">
        <img className='btnhover' src={logo} alt="Sidi_Bou_Solve_Logo" />
        <div className="notfoundtext">
            <h1><span className='gradiant-color'>404</span>  Error</h1>
            <p>Oops! This Page doesn't exist!</p>
            <Link to='/'>
                <button className='white-btn btnhover'>Back To Home</button>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
