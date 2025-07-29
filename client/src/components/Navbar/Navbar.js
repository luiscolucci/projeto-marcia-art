import React from 'react';
import { Link } from 'react-router-dom'; // 1. Importa o componente Link
import './Navbar.css';
import logoImage from '../../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        {/* 2. O logo agora é um Link para a página inicial */}
        <Link to="/">
          <img src={logoImage} alt="Logo Marcia Santos Art" className="navbar-logo-image" />
        </Link>
      </div>
      <ul className="navbar-links">
        {/* 3. Todas as tags <a> foram trocadas por <Link> */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/galeria">Galeria</Link></li>
        <li><Link to="/loja">Loja</Link></li>
        <li><Link to="/sobre">Sobre</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/contato">Contato</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;