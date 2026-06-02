import React from 'react';
import styles from './featurecard.module.css';

const FeatureCard = ({ title, description, icon, accentColor = '#7c3aed' }) => {
  const dynamicStyle = {
    '--accent-color': accentColor,
  };

  return (
    <div className={styles.card} style={dynamicStyle}>
      <div className={styles.iconWrapper}>
        {icon && <img src={icon} alt="" className={styles.icon} />}
      </div>
      <div className={styles.textContainer}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;