import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/header/Header';
import styles from './LandingPage.module.css'
import Subtitle from '../../components/SubTitle/Subtitle';
import categoryicon from '../../assets/category-icon.svg'
import CategorieCard from '../../components/CategoieCard/CategorieCard';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import Footer from '../../components/Footer/Footer';

const LandingPage = () => {

  const categories = [
    {
      icon:"/science-categorie.svg" ,
      title: "Science & Technologie",
      description: "Testez vos connaissances en sciences et technologies avec nos quiz !",
      accentColor: "#2A82D7"
    },
    {
      icon:"./math-categorie.svg" ,
      title: "Mathématiques",
      description: "Explorez les mathematiques avec nos quiz fascinants !",
      accentColor: "#4B0082"
    },
    {
      icon:"./chemistry-categorie.svg" ,
      title: "Chimie",
      description: "Découvrez le monde des chimie et de la culture à travers nos quiz !",
      accentColor: "#2ECC71"
    },
    {
      icon:"./biology-categorie.svg" ,
      title: "Biologie",
      description: "Découvrez le monde des biologie et de la culture à travers nos quiz !",
      accentColor: "#8BC34A"
    },
    {
      icon:"./general-knowledge-categorie.svg" ,
      title: "Culture Générale",
      description: "Découvrez le monde de la culture et de la culture à travers nos quiz !",
      accentColor: "#FFC107"
    },
    {
      icon:"./news-categorie.svg" ,
      title: "Actualités",
      description: "Découvrez le monde de l'actualité et de la culture à travers nos quiz !",
      accentColor: "#FF6B6B"
    }
  ];

  const features = [
    {
      icon: "/feature1-icon.svg",
      title: "Système de récompenses",
      description: "Gagnez des points, badges et récompenses réelles.",
      accentColor: "#7c3aed"
    },
    {
      icon: "/feature2-icon.svg",
      title: "Système de récompenses", 
      description: "Gagnez des points, badges et récompenses réelles",
      accentColor: "#F15540"
    },
    {
      icon: "/feature3-icon.svg",
      title: "Découverte de quiz variés",
      description: "Explorez une large selection de quiz dans differentes categories pour tester vos connaissances et apprendre en vous amusant.",
      accentColor: "#005CFF"
    },
    {
      icon: "/feature4-icon.svg",
      title: "Suivi de progression",
      description: "Suivez votre évolution facilement via votre dashboard.",
      accentColor: "#00FF70"
    },
    {
      icon: "/feature5-icon.svg",
      title: "Contenu Éducatif",
      description: "Affrontez d'autres participants, gagnez des points, débloquez des badges et progressez dans le classement",
      accentColor: "#FF8E00"
    },
    {
      icon: "/feature6-icon.svg",
      title: "Progression Personnalisée",
      description: "Compatible mobile Accédez aux quiz partout, à tout moment, sur tout appareil.",
      accentColor: "#7F00FF"
    }
  ];

  const members = [
        { name: "Khouloud LAJILI",
          uni: "IMSET Nabeul",
          image: "/team/khouloud.webp"
         },
        { name: "Hedi TEMANI",
          uni: "IMSET Nabeul",
          image: "/team/hedi.webp"
         },
        { name: "Mohamed Khalil KHALFALLAH",
          uni: "IMSET Nabeul",
          image: "/team/khalil.webp"
         },
        { name: "Jasser MTIR",
          uni: "IMSET Nabeul",
          image: "/team/jasser.webp"
         },
        { name: "Houda ZAININE",
          uni: "IMSET Nabeul",
          image: "/team/houda.webp"
         },
        { name: "Abdelkader BOUZIDI",
          uni: "IMSET Nabeul",
          image: "/team/gadour.webp"
        },
        { name: "Karim ZIRAOUI",
          uni: "IMSET Nabeul",
          image: "/team/karim.webp"
        }

    ];


  return (
    <div >
      <Navbar />
      <Header />


      <section className={`${styles.categorieSection} padding ph`}>
        <div className={`${styles.categorieContainer}`}>
          <Subtitle logosrc={categoryicon} headertitle="Catégories" />
          <h1 >Exporez <span className='gradiant-color'>les catégories de quiz</span></h1>
          <p style={{ textAlign: 'center' }}>Decouvrez des quiz dans diverses categories pour tester et developper vos connaissances.</p>
          <div className={styles.categorieCards}>
            {categories.map((category, index) => (
              <CategorieCard
                key={index}
                icon={category.icon}
                title={category.title}
                description={category.description}
                accentColor={category.accentColor}
              />
            ))}
          </div>

        </div>
      </section>


      <section className={`${styles.featureSection} padding ph`}>
        <div className={`${styles.categorieContainer}`}>
          <Subtitle logosrc="/featurelogo.svg" headertitle="Pourqoui nous" />
          <h1 ><span className='gradiant-color'>Pourquoi</span> Sidi Bou Solve</h1>
          <p style={{ textAlign: 'center' }}>Apprentissage personnalisé<br />Des quiz adaptatifs selon votre niveau et votre rythme d'apprentissage.</p>
          <div className={styles.categorieCards}>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                accentColor={feature.accentColor}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

        </div>
      </section>

      <section className={styles.teamSection}>
            <div className={styles.container}>
                <Subtitle logosrc="team-icon.svg" headertitle="La Nouvelle Génération" />
                <h1 ><span className='gradiant-color'>L'équipe</span> Sidi Bou Solve</h1>
                <p style={{ textAlign: 'center', color: 'fff' }}>Des étudiants passionnés qui réinventent l'apprentissage numérique avec créativité.</p>
                <div className={styles.grid}>
                    {members.map((member, index) => (
                        <div key={index} className={`${styles.card} btnhover`}>
                            <div className={styles.imgBox}>
                                <img src={member.image} alt={member.name} />
                            </div>
                            <h3>{member.name}</h3>
                            <p>{member.uni}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    
    <Footer id="footer" />
      
    </div>
  );
};

export default LandingPage;