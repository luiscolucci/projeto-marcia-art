import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logoImage from "../../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Efeito para travar o scroll do body quando o menu está aberto
  useEffect(() => {
    // Adiciona ou remove a classe no body
    if (isMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    // Função de limpeza para remover a classe caso o componente seja desmontado
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isMenuOpen]);

  return (
    <>
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

        {/* Links do Desktop */}
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

        {/* Ícone do Hambúrguer (agora um <button> para melhor acessibilidade) */}
        <button
          className={`hamburger-icon ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <div className="hamburger-line line1"></div>
          <div className="hamburger-line line2"></div>
          <div className="hamburger-line line3"></div>
        </button>
      </nav>

      {/* Menu Lateral Deslizante (Sidebar) */}
      <div className={`mobile-menu-sidebar ${isMenuOpen ? "open" : ""}`}>
        <ul className="mobile-menu-links">
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

      {/* Fundo Escurecido (Backdrop) */}
      {isMenuOpen && <div className="backdrop" onClick={toggleMenu}></div>}
    </>
  );
};

export default Navbar;
