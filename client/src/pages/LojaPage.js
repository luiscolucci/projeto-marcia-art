import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LojaPage.css';

const LojaPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // A chamada é para a MESMA API, pois ela já retorna todos os dados que precisamos
        const response = await fetch('http://localhost:3001/api/obras');
        
        if (!response.ok) {
          throw new Error('Falha ao buscar dados do servidor');
        }
        
        const data = await response.json();
        setProducts(data); // Armazena os produtos no estado
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="shop-page-container"><p>Carregando produtos...</p></div>;
  }

  if (error) {
    return <div className="shop-page-container"><p>Erro: {error}</p></div>;
  }

  return (
    <div className="shop-page-container">
      <h1 className="shop-title">Loja de Arte</h1>
      <div className="product-grid">
        {/* Mapeia sobre o estado 'products' que veio da API */}
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={require(`../assets/${product.image}`)} alt={product.title} className="product-image" />
              {!product.isAvailable && <div className="product-sold-out-overlay">Vendido</div>}
            </div>
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">
                {/* Garante que o preço exista antes de formatar */}
                {product.price ? product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Preço sob consulta'}
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
        ))}
      </div>
    </div>
  );
};

export default LojaPage;