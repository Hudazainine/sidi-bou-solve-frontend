import React from 'react'
import './Header.css'
import Subtitle from '../SubTitle/Subtitle'
import { Link } from 'react-router-dom'
import headericon from '../../assets/header-logo.svg'
import usersbanner from '../../assets/usersbanner.svg'

const Header = () => {
  return (
    <div className='header-container padding'>
        <Subtitle logosrc={headericon} headertitle = "l'expérience de quiz ultime" />
        <h1 >SIDI BOU SOLVE <span className='gradiant-color'>Apprendre en jouant, Progresser en s'amusant</span></h1>
        <p style={{ textAlign: 'center' }}>Rejoignez des milliers d'utilisateurs sur la plateforme de quiz interactive<br/>Testez vos connaissances, relevez des défis face à d'autres<br/> participants T et gagnez des récompenses passionnantes</p>
        <div className='headerbtnsection'>
          <Link to='/register'><button className='blue-btn'>Commencer</button></Link>
          <Link to='/login'> <button className='white-btn'>Explorer les quiz</button></Link>
        </div>
        <p className='display-flex'><img src={usersbanner} alt="users_image" /> <span className='gradiant-color' >5,000+</span> students joined this week</p>
    </div>
  )
}
export default Header
