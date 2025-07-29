import React from 'react';
import './Hero.css'; // A importação deve corresponder ao nome do arquivo: Hero.css

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">A Arte que Transcende o Olhar</h1>
        <p className="hero-subtitle">Descubra um universo de cores e formas nas obras de Marcia Santos.</p>
        <button className="hero-button">Conheça a Galeria</button>
      </div>
    </div>
  );
};

export default Hero;