import React from 'react';
import './AboutSummary.css';
import profileImage from '../../assets/profile-marcia.jpg'; // Importa a foto de perfil

const AboutSummary = () => {
  return (
    <section className="about-summary-container">
      <div className="about-summary-image">
        <img src={profileImage} alt="Artista Marcia Santos" />
      </div>
      <div className="about-summary-content">
        <h2 className="about-summary-title">Sobre a Artista</h2>
        <p className="about-summary-text">
          Marcia Santos transforma telas em universos vibrantes de emoção e cor. Com uma trajetória marcada pela experimentação e uma profunda conexão com a natureza e o cosmos, cada obra é um convite para uma jornada sensorial única. Sua paixão pela arte é a força motriz que dá vida a cada pincelada.
        </p>
        <button className="about-summary-button">Leia mais</button>
      </div>
    </section>
  );
};

export default AboutSummary;