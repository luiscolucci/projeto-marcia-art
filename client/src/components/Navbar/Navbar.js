import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logoImage from "../../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((s) => !s);

  // trava o scroll do body quando o menu está aberto
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

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

      {/* Desktop links */}
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

      {/* Botão hambúrguer - usa SVG embutido (não depende de FontAwesome) */}
      <button
        className="hamburger-icon"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
      >
        {isMenuOpen ? (
          // Ícone X
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          // Ícone hambúrguer
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M3 7h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M3 12h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M3 17h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      {/* Menu móvel (overlay). Clique no overlay fecha, clique nos links também fecha. */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={toggleMenu}>
          <ul
            className="mobile-menu-links"
            onClick={(e) => e.stopPropagation()}
          >
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
