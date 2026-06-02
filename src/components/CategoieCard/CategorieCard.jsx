import React from 'react';
import styles from './categoriecard.module.css';

const CategorieCard = ({ title, description, icon, accentColor = '#2563eb' }) => {
  const dynamicStyle = {
    '--accent-color': accentColor,
  };

  return (
    <div className={styles.card} style={dynamicStyle}>
      <div className={styles.iconContainer}>
        {icon && <img src={icon} alt={title} className={styles.icon} />}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <a href="#" className={styles.link}>
          Explore Sidi Bou Solve <span className={styles.arrow}>→</span>
        </a>
      </div>
    </div>
  );
};

export default CategorieCard;