import React from 'react';
import './Navbar.css'; // Importa nosso arquivo de estilos
import logoImage from '../../assets/logo.png'; // 1. IMPORTA A IMAGEM DO LOGO

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        {/* 2. USA A IMAGEM DO LOGO AQUI */}
        <img src={logoImage} alt="Logo Marcia Santos Art" className="navbar-logo-image" />
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