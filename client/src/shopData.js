// Podemos reusar as mesmas importações de imagem que fizemos no galleryData.js
// ou criar novas se os produtos forem diferentes da galeria.
import Obra1 from "./assets/obra01.jpg";
import Obra2 from "./assets/obra02.jpg";
import Obra3 from "./assets/obra03.jpg";
import Obra4 from "./assets/obra04.jpg";
import Obra5 from "./assets/obra05.jpg";
import Obra6 from "./assets/obra06.jpg";
import Obra7 from "./assets/obra07.jpg";

// Lista de produtos da loja
export const shopProducts = [
  {
    id: "prod1",
    title: "O Vaso que Contém o Universo",
    description: "Acrílica e posca sobre tela, 100 x 70 cm",
    image: Obra1,
    price: 1250.0, // Preço em número, sem R$
    isAvailable: true,
  },
  {
    id: "prod2",
    title: "Título da Obra 2",
    description: "Técnica e dimensões da obra 2",
    image: Obra2,
    price: 800.0,
    isAvailable: true,
  },
  {
    id: "prod3",
    title: "O Vaso que Contém o Universo",
    description: "Técnica e dimensões da obra 3",
    image: Obra3,
    price: 2100.0,
    isAvailable: true, // Exemplo de um produto indisponível
  },
  {
    id: "prod4",
    title: "Título da Obra 4",
    description: "Técnica e dimensões da obra 4",
    image: Obra4,
    price: 950.0,
    isAvailable: false,
  },
  {
    id: "prod5",
    title: "Título da Obra 5",
    description: "Técnica e dimensões da obra 5",
    image: Obra5,
    price: 950.0,
    isAvailable: true,
  },
  {
    id: "prod6",
    title: "Título da Obra 6",
    description: "Técnica e dimensões da obra 6",
    image: Obra6,
    price: 950.0,
    isAvailable: true,
  },
  {
    id: "prod7",
    title: "Yemanja",
    description: "Técnica e dimensões da obra 7",
    image: Obra7,
    price: 950.0,
    isAvailable: true,
  },
];
