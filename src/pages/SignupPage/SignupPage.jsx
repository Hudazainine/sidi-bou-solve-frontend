import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignupPage.css';
import Logo from "../../assets/logov2.svg";
import ReCAPTCHA from "react-google-recaptcha";
import Socialbtn from '../../components/Socialmediaconnectbtn/Socialbtn';
import Facebookicon from '../../assets/facebook-round-color-icon.svg';
import Googleicon from '../../assets/google-color-icon.svg';
import api from '../../services/api';
import toast from 'react-hot-toast';

const SignupPage = () => {
    const navigate = useNavigate();
    const recaptchaRef = useRef();
    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const [formData, setFormData] = useState({
        prenom: '',
        nom: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Fonction de contrôle de saisie
    const validateForm = () => {
        const { prenom, nom, email, password, confirmPassword } = formData;

        if (!prenom || !nom || !email || !password) {
            toast.error("Veuillez remplir tous les champs.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Veuillez entrer une adresse email valide.");
            return false;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.error("Le mot de passe doit contenir au moins 8 caractères, incluant des lettres, des chiffres et des symboles.");
            return false;
        }

        if (password !== confirmPassword) {
            toast.error("Les mots de passe ne correspondent pas !");
            return false;
        }

        // Vérification ReCAPTCHA
        const recaptchaValue = recaptchaRef.current.getValue();
        if (!recaptchaValue) {
            toast.error("Veuillez valider le ReCAPTCHA.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const registerPayload = {
                nom: formData.nom,
                prenom: formData.prenom,
                email: formData.email,
                password: formData.password,
                role: 'STUDENT'
            };

            const res = await api.post('users/register/', registerPayload);
            
            if (res.status === 201 || res.status === 200) {
            const { access, nom, prenom } = res.data;

            if (access) {
                // 1. Sajjel el Token
                localStorage.setItem('access_token', access);
                
                // 2. Sajjel el Slug (bech el URL i-ji s-hih)
                const userSlug = `${prenom.toLowerCase()}-${nom.toLowerCase()}`;
                localStorage.setItem('user_slug', userSlug);

                toast.success("Compte créé avec succès !");
                
                // 3. Navigate direct lel URL personnalisé
                setTimeout(() => navigate(`/${userSlug}`), 1000);
            } else {
                // Au cas où ma rja3ch token, hazzou lel login (fallback)
                toast.success("Compte créé ! Veuillez vous connecter.");
                setTimeout(() => navigate('/login'), 1000);
            }
        }
        } catch (err) {
            console.error("Register Error:", err.response?.data);
            
            const backendErrors = err.response?.data;
            if (backendErrors?.email) {
                toast.error("Cet email est déjà utilisé.");
            } else if (backendErrors?.nom) {
                toast.error("Ce nom d'utilisateur est déjà pris.");
            } else {
                toast.error("Erreur lors de l'inscription. Veuillez réessayer.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='SignupPage-container'>
            <section className="logo-section">  
                <Link to="/">
                    <img className='btnhover logo-signup' src={Logo} alt="Logo" />
                </Link>
            </section>

            <div className="form-section">
                <form onSubmit={handleSubmit}>
                    <h1>Créer un Compte</h1>
                    <span>Vous avez déjà un compte ? <Link to='/login'><span className='lignetxt'>Se connecter</span></Link></span>

                    <div className="name-fields" style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ flex: 1 }}>
                            <label>Prénom</label>
                            <input 
                                type="text" 
                                placeholder="Prénom" 
                                value={formData.prenom}
                                onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>Nom</label>
                            <input 
                                type="text" 
                                placeholder="Nom" 
                                value={formData.nom}
                                onChange={(e) => setFormData({...formData, nom: e.target.value})}
                            />
                        </div>
                    </div>

                    <label>Adresse email</label>
                    <input 
                        type="email" 
                        placeholder="Tapez votre adresse email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />

                    <label>Mot de passe</label>
                    <input 
                        type="password" 
                        placeholder="Tapez votre mot de passe" 
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />

                    <label>Confirmer le mot de passe</label>
                    <input 
                        type="password" 
                        placeholder="Confirmez votre mot de passe" 
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    />

                    <span className='password-condition'>Utilisez 8 caractères ou plus avec un mélange de lettres, de nombres et de symboles</span>

                    <p>En créant un compte, vous acceptez nos <br/> <span className='lignetxt'>Conditions d'utilisation</span> et notre <span className='lignetxt'>Politique de confidentialité</span></p>

                    <div className="captcha-container" style={{ margin: '20px 0' }}>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6LdgKIgsAAAAANy83tjjPRt7HQB276IUMoLaHuU4"
                        />
                    </div>

                    <button 
                        type='submit' 
                        className='bluebtn btnhover' 
                        disabled={isLoading}
                    >
                        {isLoading ? 'Création en cours...' : 'Créer un compte'}
                    </button>

                    <div className="connectbtns">
                        <Socialbtn btnimage={Facebookicon} />
                        <Socialbtn btnimage={Googleicon} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;