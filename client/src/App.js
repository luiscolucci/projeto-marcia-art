import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // 1. Importa as ferramentas do Router

// Importa os componentes que se repetem em todas as páginas
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';

// Importa os componentes de cada página
import HomePage from './pages/HomePage';
import GaleriaPage from './pages/GaleriaPage';
import LojaPage from './pages/LojaPage';
import SobrePage from './pages/SobrePage';
import TimelinePage from './pages/TimelinePage';
import ContatoPage from './pages/ContatoPage';

import './App.css';

function App() {
  return (
    // 2. O BrowserRouter envolve toda a aplicação para habilitar o roteamento
    <BrowserRouter>
      <ScrollToTop />

      <div className="App">
        {/* 3. Navbar e Footer ficam FORA do 'Routes' para aparecerem em todas as páginas */}
        <Navbar />
        
        <main>
          {/* 4. O 'Routes' define a área onde o conteúdo das páginas vai mudar */}
          <Routes>
            {/* 5. Cada 'Route' é uma regra: se a URL for 'path', mostre o 'element' */}
            <Route path="/" element={<HomePage />} />
            <Route path="/galeria" element={<GaleriaPage />} />
            <Route path="/loja" element={<LojaPage />} />
            <Route path="/sobre" element={<SobrePage />} />
            <Route path="/linha-do-tempo" element={<TimelinePage />} />
            <Route path="/contato" element={<ContatoPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;