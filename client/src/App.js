import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar'; // Importa nosso Navbar
import Hero from './components/Hero/Hero';

function App() {
  return (
    <div className="App">
      <Navbar /> {/* 1. USA O NOVO Navbar AQUI */}
      <Hero /> {/* 2. USA O NOVO HERO AQUI */}
      <main style={{ padding: '2rem' }}>
        <h1>Bem-vindos ao Projeto WEB Marcia</h1>
        <p>Este é o conteúdo principal da página.</p>
      </main>
    </div>
  );
}

export default App;