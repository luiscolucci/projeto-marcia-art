import React from 'react';
import Hero from '../components/Hero/Hero';
import AboutSummary from '../components/AboutSummary/AboutSummary';

const HomePage = () => {
  return (
    <>
      <Hero />
      <AboutSummary />
      {/* Futuramente, adicionaremos a seção de "Obras em Destaque" aqui */}
    </>
  );
};

export default HomePage;