import React from 'react';
import './SobrePage.css'; // Vamos criar este arquivo de estilo
import profileImage from '../assets/profile-marcia.jpg'; // Importa a imagem de perfil

const SobrePage = () => {
  return (
    <div className="sobre-page-container">
      <div className="sobre-header">
        <h1>Sobre a Artista</h1>
      </div>
      <div className="sobre-content">
        <div className="sobre-image-wrapper">
          <img src={profileImage} alt="Marcia Santos" className="sobre-profile-image" />
        </div>
        <div className="sobre-text-wrapper">
          <h2>Marcia Santos</h2>
          <p>
            Desde a infância, a arte tem sido a linguagem através da qual Marcia Santos expressa suas mais profundas emoções e visões de mundo. Nascida em São Paulo, sua jornada artística é uma exploração contínua das texturas, cores vibrantes e da interação entre o abstrato e o figurativo.
          </p>
          <p>
            Formada em Belas Artes, Marcia aprimorou sua técnica ao longo dos anos, mas nunca perdeu a espontaneidade que caracteriza suas obras. Sua principal inspiração vem da natureza cósmica, dos sonhos e da complexidade da alma humana, resultando em peças que convidam o espectador a uma introspecção.
          </p>
          <p>
            "Para mim, cada tela é um portal. Não pinto o que vejo, mas o que sinto e o que aspiro que o mundo sinta. É uma troca de energia, uma conversa silenciosa entre a obra e quem a contempla", diz a artista.
          </p>
          <p>
            Atualmente, Marcia trabalha em seu ateliê em São Paulo, onde continua a desenvolver novas séries e a preparar-se para futuras exposições.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SobrePage;