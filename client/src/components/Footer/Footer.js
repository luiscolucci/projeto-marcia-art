import React from "react";
import { Link } from "react-router-dom"; // Mantém o Link para navegação correta
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section about">
          <h3 className="footer-section-title">Marcia Santos ART</h3>
          <p>
            Explorando o universo através das cores e formas. Cada obra é uma
            janela para a alma.
          </p>
          <div className="contact-info">
            {/* Mantemos o texto simples, sem ícones aqui para um visual mais limpo */}
            <span>Telefone: 11 98865-5838</span>
            <span>Email: marciasantosarts@gmail.com</span>
          </div>
        </div>

        <div className="footer-section links">
          <h3 className="footer-section-title">Navegação</h3>
          <ul>
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
              <Link to="/sobre">Sobre a Artista</Link>
            </li>
            <li>
              <Link to="/linha-do-tempo">Linha do Tempo</Link>
            </li>
            <li>
              <Link to="/contato">Contato</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section social">
          <h3 className="footer-section-title">Redes Sociais</h3>
          {/* VOLTAMOS A USAR AS TAGS <i> DO FONT AWESOME */}
          <div className="social-icons">
            <a
              href="https://www.instagram.com/marciasantosart?igsh=cTI1aTRvZnVnbTBs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.facebook.com/share/19DLN1hnaC/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-pinterest-p"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {currentYear} Marcia Santos ART | Todos os direitos reservados.
        <br />
        <span>
          Desenvolvido por Luis Colucci |{" "}
          <a
            href="https://curriculo-643629858897.southamerica-east1.run.app/#inicio"
            target="_blank"
            rel="noopener noreferrer"
          >
            Meu Portfólio
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
