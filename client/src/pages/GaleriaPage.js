import React from "react";
import { galleryItems } from "../galleryData"; // 1. Importa nossa lista de obras
import "./GaleriaPage.css"; // Vamos criar este arquivo de estilo a seguir

const GaleriaPage = () => {
  return (
    <div className="gallery-page-container">
      <h1 className="gallery-title">Galeria de Arte</h1>
      <div className="gallery-grid">
        {/* 2. Usa o .map() para criar um card para cada item da nossa lista */}
        {galleryItems.map((item) => (
          <div key={item.id} className="gallery-card">
            <img src={item.image} alt={item.title} className="gallery-image" />
            <div className="gallery-card-overlay">
              <h3 className="gallery-card-title">{item.title}</h3>
              <p className="gallery-card-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GaleriaPage;
