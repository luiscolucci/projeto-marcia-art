import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LojaPage.css";

const LojaPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // --- CORREÇÃO 1: URL da API dinâmica ---
        // Define a URL correta para buscar os dados em desenvolvimento ou produção
        const apiUrl =
          process.env.NODE_ENV === "production"
            ? "https://marcia-art-api-923894154927.southamerica-east1.run.app/api/obras"
            : "http://localhost:3001/api/obras";

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Falha ao buscar dados do servidor");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="shop-page-container">
        <p>Carregando produtos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shop-page-container">
        <p>Erro: {error}</p>
      </div>
    );
  }

  return (
    <div className="shop-page-container">
      <h1 className="shop-title">Loja de Arte</h1>
      <div className="product-grid">
        {products.map((product) => {
          
          // --- CORREÇÃO 2: Lógica inteligente para a URL da imagem ---
          let imageUrl;
          // Verifica se o campo 'image' já é uma URL completa (obras novas)
          if (product.image && typeof product.image === 'string' && product.image.startsWith('http')) {
            imageUrl = product.image;
          } else {
            // Se for só um nome de arquivo, usa o `require` (obras antigas)
            try {
              imageUrl = require(`../assets/${product.image}`);
            } catch (e) {
              console.error(`Imagem local não encontrada: ../assets/${product.image}`);
              imageUrl = ''; // Define como vazio se a imagem local não for encontrada
            }
          }
          // ----------------------------------------------------------------

          return (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img
                  src={imageUrl} // Usa a variável imageUrl que definimos acima
                  alt={product.title}
                  className="product-image"
                />
                {!product.isAvailable && (
                  <div className="product-sold-out-overlay">Vendido</div>
                )}
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">
                  {product.price
                    ? product.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })
                    : "Preço sob consulta"}
                </p>

                {product.isAvailable ? (
                  <Link
                    to={`/contato?obra=${encodeURIComponent(product.title)}`}
                    className="product-button"
                  >
                    Tenho Interesse
                  </Link>
                ) : (
                  <button className="product-button" disabled={true}>
                    Vendido
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LojaPage;
