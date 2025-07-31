import React from 'react';
import './ContatoPage.css'; // Vamos criar este arquivo

const ContatoPage = () => {
  return (
    <div className="contact-page-container">
      <div className="contact-header">
        <h1>Fale Comigo</h1>
        <p>Tem alguma dúvida, proposta ou gostaria de encomendar uma obra? Preencha o formulário abaixo ou utilize um dos canais de contato.</p>
      </div>
      <div className="contact-content-wrapper">
        <div className="contact-form-container">
          {/* O formulário aponta para a sua URL do Formspree */}
          <form action="https://formspree.io/f/SUA_URL_AQUI" method="POST">
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Seu E-mail</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Assunto</label>
              <input type="text" id="subject" name="subject" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensagem</label>
              <textarea id="message" name="message" rows="6" required></textarea>
            </div>
            <button type="submit" className="submit-button">Enviar Mensagem</button>
          </form>
        </div>
        <div className="contact-info-container">
          <h3>Informações de Contato</h3>
          <p><strong>Email:</strong><br />email.da.marcia@exemplo.com</p>
          <p><strong>Telefone:</strong><br />(11) 99999-8888</p>
          <p><strong>Ateliê:</strong><br />São Paulo, SP (Visitas com hora marcada)</p>
          
          <h3>Redes Sociais</h3>
          <div className="social-icons-contact">
            <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-pinterest-p"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContatoPage;