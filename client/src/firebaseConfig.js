// Importa as funções necessárias do Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Suas credenciais do Firebase que você copiou
const firebaseConfig = {
  apiKey: "AIzaSyDDHnTHh1Mq1E75tdesBp9UDSeOQzDQ7EY",
  authDomain: "marcia-art.firebaseapp.com",
  projectId: "marcia-art",
  storageBucket: "marcia-art.firebasestorage.app",
  messagingSenderId: "923894154927",
  appId: "1:923894154927:web:1a867775c1b3232f3a365a",
};

// Inicializa a aplicação Firebase
const app = initializeApp(firebaseConfig);

// Exporta o serviço de autenticação para ser usado em outras partes do nosso site
export const auth = getAuth(app);
