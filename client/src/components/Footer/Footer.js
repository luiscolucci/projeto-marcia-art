import React from "react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Pega o ano atual automaticamente

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section about">
          <h3 className="footer-section-title">Marcia Santos ART</h3>
          <p>
            Explorando o universo através das cores e formas. Cada obra é uma
            janela para a alma.
          </p>
          <div className="contact">
            <span>
              <i className="fas fa-phone"></i> &nbsp; [SEU TELEFONE]
            </span>
            <span>
              <i className="fas fa-envelope"></i> &nbsp; [SEU EMAIL]
            </span>
          </div>
        </div>

        <div className="footer-section links">
          <h3 className="footer-section-title">Navegação</h3>
          <ul>
            <li>
              <a href="/galeria">Galeria</a>
            </li>
            <li>
              <a href="/loja">Loja</a>
            </li>
            <li>
              <a href="/sobre">Sobre a Artista</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/contato">Contato</a>
            </li>
          </ul>
        </div>

        <div className="footer-section social">
          <h3 className="footer-section-title">Redes Sociais</h3>
          <div className="social-icons">
            {/* Substitua '#' pelos links reais das redes sociais */}
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-pinterest-p"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {currentYear} Marcia Santos ART | Todos os direitos reservados.
        <br />
        Desenvolvido por Luis Colucci |{" "}
        <li>
          <a href="/contato">Meu Portfólio</a>
        </li>
      </div>
    </footer>
  );
};

export default Footer;
