import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar'; // Importa nosso Navbar

function App() {
  return (
    <div className="App">
      <Navbar /> {/* Usa o componente Navbar aqui */}
      <main style={{ padding: '2rem' }}>
        <h1>Bem-vinda ao Projeto WEB Marcia</h1>
        <p>Este é o conteúdo principal da página.</p>
      </main>
    </div>
  );
}

export default App;