import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // 1.. Importa o hook useLocation
import "./ContatoPage.css"; // Vamos criar este arquivo

const ContatoPage = () => {
  // Hook para ler as informações da URL
  const location = useLocation();

  // Cria um "estado" para o campo de assunto, permitindo que ele seja dinâmico
  const [subject, setSubject] = useState("");

  // Este efeito roda sempre que a página é carregada ou a URL muda
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const obraTitle = params.get("obra"); // Busca pelo parâmetro 'obra' na URL

    // Se encontrou um título de obra, define o valor do campo de assunto
    if (obraTitle) {
      setSubject(`Interesse na obra: ${obraTitle}`);
    } else {
      setSubject(""); // Limpa o campo se não houver obra na URL
    }
  }, [location]);

  // Função necessária para permitir que o usuário edite o campo de assunto
  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  return (
    <div className="contact-page-container">
      <div className="contact-header">
        <h1>Fale Comigo</h1>
        <p>
          Tem alguma dúvida, proposta ou gostaria de encomendar uma obra?
          Preencha o formulário abaixo ou utilize um dos canais de contato.
        </p>
      </div>
      <div className="contact-content-wrapper">
        <div className="contact-form-container">
          {/* O formulário aponta para a sua URL do Formspree */}
          <form action="https://formspree.io/f/mldllojq" method="POST">
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Seu E-mail</label>
              <input type="email" id="email" name="_replyto" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Assunto</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={subject}
                onChange={handleSubjectChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensagem</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                required
              ></textarea>
            </div>
            <input
              type="hidden"
              name="_subject"
              value="Novo Contato do Site - Marcia Art!"
            />
            <button type="submit" className="submit-button">
              Enviar Mensagem
            </button>
          </form>
        </div>
        <div className="contact-info-container">
          <h3>Informações de Contato</h3>
          <p>
            <strong>Email:</strong>
            <br />
            marciasantosarts@gmail.com
          </p>
          <p>
            <strong>Telefone:</strong>
            <br />
            (11) 99999-8888
          </p>
          <p>
            <strong>Ateliê:</strong>
            <br />
            São Paulo, SP (Visitas com hora marcada)
          </p>

          <h3>Redes Sociais</h3>
          <div className="social-icons-contact">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-pinterest-p"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContatoPage;
