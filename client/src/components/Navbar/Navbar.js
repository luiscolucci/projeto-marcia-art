import React, { useState } from "react"; // 1. Importa o useState
import { Link } from "react-router-dom";
import "./Navbar.css";
import logoImage from "../../assets/logo.png";

const Navbar = () => {
  // 2. Cria um estado para controlar se o menu móvel está aberto ou fechado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 3. Função para alternar o estado do menu (abrir/fechar)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <Link to="/">
          <img
            src={logoImage}
            alt="Logo Marcia Santos Art"
            className="navbar-logo-image"
          />
        </Link>
      </div>

      {/* 4. Menu para Desktop (links tradicionais) */}
      <ul className="navbar-links-desktop">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/galeria">Galeria</Link>
        </li>
        <li>
          <Link to="/loja">Loja</Link>
        </li>
        <li>
          <Link to="/sobre">Sobre</Link>
        </li>
        <li>
          <Link to="/linha-do-tempo">Linha do Tempo</Link>
        </li>
        <li>
          <Link to="/contato">Contato</Link>
        </li>
      </ul>

      {/* 5. Ícone do Hambúrguer (só aparecerá em telas pequenas) */}
      <div className="hamburger-icon" onClick={toggleMenu}>
        <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      {/* 6. Menu Móvel (overlay que aparece quando o menu está aberto) */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay">
          <ul className="mobile-menu-links">
            {/* Adicionamos o onClick para fechar o menu ao clicar em um link */}
            <li>
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/galeria" onClick={toggleMenu}>
                Galeria
              </Link>
            </li>
            <li>
              <Link to="/loja" onClick={toggleMenu}>
                Loja
              </Link>
            </li>
            <li>
              <Link to="/sobre" onClick={toggleMenu}>
                Sobre
              </Link>
            </li>
            <li>
              <Link to="/linha-do-tempo" onClick={toggleMenu}>
                Linha do Tempo
              </Link>
            </li>
            <li>
              <Link to="/contato" onClick={toggleMenu}>
                Contato
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
