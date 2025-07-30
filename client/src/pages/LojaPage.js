import React from "react";
import { shopProducts } from "../shopData"; // Importa nossa lista de produtos
import "./LojaPage.css"; // Vamos criar este arquivo de estilo a seguir

const LojaPage = () => {
  return (
    <div className="shop-page-container">
      <h1 className="shop-title">Loja de Arte</h1>
      <div className="product-grid">
        {shopProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img
                src={product.image}
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
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
                {product.isAvailable ? (
            <a 
                href={`mailto:email.da.marcia@exemplo.com?subject=Interesse na obra: ${encodeURIComponent(product.title)}`} 
                className="product-button"
            >
                Tenho Interesse
            </a>
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
