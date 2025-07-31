import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Pega o pathname (ex: "/contato", "/galeria") da localização atual
  const { pathname } = useLocation();

  // Este efeito é executado toda vez que o 'pathname' muda
  useEffect(() => {
    // Rola a janela para as coordenadas x:0, y:0 (o topo da página)
    window.scrollTo(0, 0);
  }, [pathname]); // O array de dependências garante que o efeito só rode quando a URL mudar

  // Este componente não renderiza nada visualmente, ele é apenas funcional
  return null;
};

export default ScrollToTop;