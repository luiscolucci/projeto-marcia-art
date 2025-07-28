import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // Cria um 'estado' para armazenar a mensagem que virá do servidor
  const [mensagem, setMensagem] = useState('');

  // useEffect é executado assim que o componente é montado na tela
  useEffect(() => {
    // 'fetch' é a função que busca dados de uma URL
    // Graças ao proxy, não precisamos escrever 'http://localhost:3001/api'
    fetch('/api')
      .then(res => res.json()) // Converte a resposta para o formato JSON
      .then(data => setMensagem(data.message)); // Pega a mensagem e a guarda no nosso 'estado'
  }, []); // O [] vazio garante que isso execute apenas uma vez

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {/* Aqui exibimos a nossa mensagem do servidor */}
        <p style={{ marginTop: '20px', color: '#61dafb', fontSize: '24px' }}>
          {mensagem || 'Carregando mensagem do servidor...'}
        </p>

      </header>
    </div>
  );
}

export default App;