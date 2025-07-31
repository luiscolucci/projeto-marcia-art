// Importa as imagens da pasta assets
// O React vai processar essas imagens e nos dar o caminho correto para elas
import Obra1 from "./assets/obra01.jpg";
import Obra2 from "./assets/obra02.jpg";
import Obra3 from "./assets/obra03.jpg";
import Obra4 from "./assets/obra04.jpg";
import Obra5 from "./assets/obra05.jpg";
import Obra6 from "./assets/obra06.jpg";
import Obra7 from "./assets/obra07.jpg";

// Lista de obras da galeria
export const galleryItems = [
  {
    id: 1,
    title: "O Vaso que Contém o Universo",
    description: "Acrílica e posta sobre tela, 100 x 70 cm",
    image: Obra1, // Usa a variável importada
  },
  {
    id: 2,
    title: "Título da Obra 2",
    description: "Técnica e dimensões da obra 2",
    image: Obra2,
  },
  {
    id: 3,
    title: "O Vaso que Contém o Universo",
    description: "Tcrílica e posca sobre tela, 100 x 70 cm",
    image: Obra3,
  },
  {
    id: 4,
    title: "Título da Obra 4",
    description: "Técnica e dimensões da obra 4",
    image: Obra4,
  },
  {
    id: 5,
    title: "Título da Obra 5",
    description: "Técnica e dimensões da obra 5",
    image: Obra5,
  },
  {
    id: 6,
    title: "Título da Obra 6",
    description: "Técnica e dimensões da obra 6",
    image: Obra6,
  },
  {
    id: 7,
    title: "Yemanjá",
    description: "Técnica e dimensões da obra 7",
    image: Obra7,
  },
  // Se tiver mais obras, pode adicionar mais objetos aqui seguindo o mesmo modelo
];
