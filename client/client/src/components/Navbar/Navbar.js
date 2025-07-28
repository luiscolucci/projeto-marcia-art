import React from 'react';
import './Navbar.css'; // Importa nosso arquivo de estilos

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        {/* Futuramente, colocaremos a imagem do logo aqui */}
        Marcia Santos ART
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/galeria">Galeria</a></li>
        <li><a href="/loja">Loja</a></li>
        <li><a href="/sobre">Sobre</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/contato">Contato</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;