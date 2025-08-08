import React, { useState, useEffect } from "react"; // 1. Importa useState e useEffect
import "./GaleriaPage.css";

const GaleriaPage = () => {
  // 2. Cria estados para guardar as obras, o status de carregamento e possíveis erros
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. O useEffect executa esta função assim que o componente é montado
  useEffect(() => {
    // A função que busca os dados da nossa API
    const fetchObras = async () => {
      try {
        // Faz a chamada para a nossa API no backend
        const response = await fetch(
          "https://server-image-923894154927.southamerica-east1.run.app/api/obras"
        );

        // Se a resposta não for OK (ex: erro 500 no servidor), lança um erro
        if (!response.ok) {
          throw new Error("Falha ao buscar dados do servidor");
        }

        // Converte a resposta para JSON
        const data = await response.json();

        // Atualiza nosso estado com os dados recebidos
        setObras(data);
      } catch (err) {
        // Se houver qualquer erro na chamada, atualiza o estado de erro
        setError(err.message);
      } finally {
        // Independente de sucesso ou erro, para de carregar
        setLoading(false);
      }
    };

    fetchObras(); // Executa a função de busca
  }, []); // O [] vazio garante que isso execute apenas uma vez

  // 4. Lógica de renderização condicional
  if (loading) {
    return (
      <div className="gallery-page-container">
        <p>Carregando obras...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gallery-page-container">
        <p>Erro: {error}</p>
      </div>
    );
  }

  return (
    <div className="gallery-page-container">
      <h1 className="gallery-title">Galeria de Arte</h1>
      <div className="gallery-grid">
        {/* 5. Mapeia sobre o estado 'obras', que agora contém os dados da API */}
        {obras.map((item) => (
          <div key={item.id} className="gallery-card">
            {/* O caminho da imagem agora precisa ser construído, já que o backend só nos dá o nome do arquivo */}
            <img
              src={require(`../assets/${item.image}`)}
              alt={item.title}
              className="gallery-image"
            />
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
