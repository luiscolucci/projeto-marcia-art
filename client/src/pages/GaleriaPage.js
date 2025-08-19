import React, { useState, useEffect } from "react";
import "./GaleriaPage.css";

const GaleriaPage = () => {
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchObras = async () => {
      try {
        const apiUrl =
          process.env.NODE_ENV === "production"
            ? "https://marcia-art-api-923894154927.southamerica-east1.run.app/api/obras"
            : "http://localhost:3001/api/obras";

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Falha ao buscar dados do servidor");
        }

        const data = await response.json();
        setObras(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchObras();
  }, []);

  if (loading) {
    return <div className="gallery-page-container"><p>Carregando obras...</p></div>;
  }

  if (error) {
    return <div className="gallery-page-container"><p>Erro: {error}</p></div>;
  }

  return (
    <div className="gallery-page-container">
      <h1 className="gallery-title">Galeria de Arte</h1>
      <div className="gallery-grid">
        {obras.map((item) => {
          
          // --- LÓGICA INTELIGENTE PARA LIDAR COM AMBOS OS SISTEMAS ---
          let imageUrl;
          // Verifica se o campo 'image' já é uma URL completa (obras novas)
          if (item.image && typeof item.image === 'string' && item.image.startsWith('http')) {
            imageUrl = item.image;
          } else {
            // Se for só um nome de arquivo, usa o `require` (obras antigas)
            try {
              imageUrl = require(`../assets/${item.image}`);
            } catch (e) {
              // Se a imagem local não for encontrada, usa um placeholder ou null
              console.error(`Imagem local não encontrada: ../assets/${item.image}`);
              imageUrl = ''; // ou uma imagem placeholder
            }
          }
          // ----------------------------------------------------------------

          return (
            <div key={item.id} className="gallery-card">
              <img
                src={imageUrl}
                alt={item.title}
                className="gallery-image"
              />
              <div className="gallery-card-overlay">
                <h3 className="gallery-card-title">{item.title}</h3>
                <p className="gallery-card-description">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GaleriaPage;