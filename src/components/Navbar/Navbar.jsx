import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg'
import './Navbar.css';
import "../../index.css"

const Navbar = () => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    };

    return (
        <nav>
            <div className="navbar-container padding">
                <Link to='/'>
                    <img className='logo btnhover' src={Logo} alt="Sidi Bou Solve Logo" />
                </Link>

                {/* Icône Menu Burger */}
                <div className="menu-icon" onClick={handleClick}>
                    <div className={clicked ? "line active" : "line"}></div>
                    <div className={clicked ? "line active" : "line"}></div>
                    <div className={clicked ? "line active" : "line"}></div>
                </div>

                {/* Le Menu contenant les liens et les boutons pour le mobile */}
                <div className={clicked ? "nav-menu active" : "nav-menu"}>
                    <ul>
                        <li className='btnhover'>Équipe</li>
                        <li className='btnhover'>Catégories</li>
                        <li className='btnhover'>Fonctionnalités</li>
                        <li className='btnhover'>Contact</li>
                        <li className='btnhover'>À propos</li>
                    </ul>
                    
                    <div className="nav-btns-mobile">
                        <Link to="/login" className='white-btn btnhover'>Connexion</Link>
                        <Link to="/register" className='blue-btn btnhover'>S'inscrire</Link>
                    </div>
                </div>

                {/* Boutons pour la version Desktop (visibles uniquement sur grand écran) */}
                <div className="nav-btns-desktop">
                    <Link to="/login" className='white-btn btnhover'>Connexion</Link>
                    <Link to="/register" className='blue-btn btnhover'>S'inscrire</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar