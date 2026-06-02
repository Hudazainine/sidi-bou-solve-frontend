import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './LoginPage.css';
import Logo from "/logo_noir.svg";
import PasswordHide from '../../assets/password-hide.svg';
import PasswordShow from '../../assets/password-show.svg';
import api from '../../services/api';
import Createbtn from '../../components/LightBlueBTN/LightBlueBTN';
import Socialbtn from '../../components/Socialmediaconnectbtn/Socialbtn';
import Facebookicon from '../../assets/facebook-round-color-icon.svg';
import Googleicon from '../../assets/google-color-icon.svg';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
    const token = localStorage.getItem('access_token');
    const slug = localStorage.getItem('user_slug');
    
    if (token && slug) {
        navigate(`/${slug}`);
    }
}, [navigate]);

const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
        const loginPayload = {
            identifier: credentials.email, 
            password: credentials.password
        };

        const res = await api.post('users/login/', loginPayload);
        
        const token = res.data.access;
        const { nom, prenom } = res.data; 
        
        if (token) {
            localStorage.setItem('access_token', token);
            
            const userSlug = `${prenom.toLowerCase()}.${nom.toLowerCase()}`;
            
            localStorage.setItem('user_slug', userSlug);
            
            navigate(`/${userSlug}`);
        }
    } catch (err) {
        console.error("Backend Error:", err.response?.data);
        const errorMsg = err.response?.data?.error || "Erreur de connexion";
        toast.error(errorMsg);
    } finally {
        setIsLoading(false);
    }
};

    const togglePassword = () => setShowPassword(!showPassword);

    return (
        <>
            {isLoading && (
                <div className="loading-overlay">
                    <div className="logo-spinner-container">
                        <img src={Logo} alt="Loading..." className="logo-spinner" />
                        <div className="loading-bar"></div>
                    </div>
                </div>
            )}
            <section className="login-section">
                <div className="login-container">
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="logocontainer">
                                <Link to="/">
                                <img className='logo-login' src={Logo} alt="Logo" />
                                </Link>
                            </div>
                            
                            <label style={{textAlign:'left'}}>Adresse email</label> 
                            <input
                                className='btnhover'
                                type="text" 
                                placeholder="Tapez votre adresse email"
                                value={credentials.email}
                                onChange={e => setCredentials({...credentials, email: e.target.value})} 
                                required
                            />
                            
                            <div className='password-label'>
                                <label>Mot de passe</label>
                                <div className='password-show btnhover' onClick={togglePassword} style={{cursor: 'pointer'}}>
                                    <img src={showPassword ? PasswordHide : PasswordShow} alt="" />
                                    <span>{showPassword ? 'Cacher' : 'Afficher'}</span>
                                </div>
                            </div>
                            <input 
                                className='btnhover'
                                type={showPassword ? "text" : "password"} 
                                placeholder="Tapez votre mot de passe"
                                value={credentials.password}
                                onChange={e => setCredentials({...credentials, password: e.target.value})} 
                                required
                            />
                            
                            <button type='submit' className='bluebtn' disabled={isLoading}>
                                {isLoading ? 'Chargement...' : 'Se connecter'}
                            </button>
                            <p>En continuant, vous acceptez les <span className='lignetxt'>Conditions d'utilisation</span> and <span className='lignetxt'>Politique de confidentialité.</span></p>
                            <span>Or</span>
                            <div className="connectbtns">
                                <Socialbtn btnimage={Facebookicon} />
                                <Socialbtn btnimage={Googleicon} />
                            </div>
                            <div className="bottomtext">
                                <span className='lignetxt btnhover'>Autres problèmes de connexion</span>
                                <Link to='/forgetpassword'><span className='lignetxt btnhover'>Mot de passe oublié?</span></Link>
                            </div>
                        </form>
                        <div className="buttondesigne">
                            <div className='orscetion'>
                                <div className='whiteline'></div>
                                <span style={{color:"white", fontSize: "22px", fontWeight:'300'}}>OR</span>
                                <div className='whiteline'></div>
                            </div>
                        </div>
                        <Link to="/register">
                            <Createbtn btntext ="Créer un compte" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LoginPage;