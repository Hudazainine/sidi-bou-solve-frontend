import React from 'react';
import styles from './Footer.module.css';
import Logo from '/sidi-bou-solve.svg'; 

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand Section */}
        <div className={styles.brandColumn}>
          <div className={styles.logoContainer}>
            <img src={Logo} alt="Sidi Bou Solve" className={styles.logo} />
          </div>
          <p className={styles.brandText}>
            La plateforme de quiz ultime pour étudiants et enseignants. Apprenez, concourez et gagnez des récompenses.
          </p>
          <div className={styles.socialIcons}>
            <img src="/facebook-footer.svg" alt="Facebook" />
            <img src="/instagram-footer.svg" alt="Instagram" />
            <img src="/twitter-footer.svg" alt="Twitter" />
            <img src="/linkedin-footer.svg" alt="LinkedIn" />
            <img src="/youtube-footer.svg" alt="YouTube" />
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Liens Rapides</h4>
          <ul className={styles.list}>
            <li><a href="/">Accueil</a></li>
            <li><a href="/about">À Propos</a></li>
            <li><a href="/features">Fonctionnalités</a></li>
            <li><a href="/pricing">Tarification</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* For Teachers */}
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Pour les Enseignants</h4>
          <ul className={styles.list}>
            <li><a href="/about">À Propos</a></li>
            <li><a href="/contact">Nous contacter</a></li>
            <li><a href="/careers">Carrières</a></li>
            <li><a href="/culture">Culture</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Contactez-nous</h4>
          <ul className={styles.contactList}>
            <li>
              <img src="/email-footer.svg" alt="" />
              <span>contact@sidibousolve.com</span>
            </li>
            <li>
              <img src="/phone-footer.svg" alt="" />
              <span>(216) XX XXX XXX</span>
            </li>
            <li>
              <img src="/map-pin-footer.svg" alt="" />
              <span>Nabeul, 8000</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p>Copyright © {currentYear} Sidi Bou Solve</p>
          <div className={styles.legalLinks}>
            <span>Tous droits réservés | </span>
            <a href="/terms">Termes et Conditions</a> | 
            <a href="/privacy">Politique de Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;