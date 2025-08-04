// Importa o framework Express que já tínhamos instalado
const express = require('express');

// NOVO: Importa as ferramentas do Firebase Admin SDK
const admin = require('firebase-admin');

// NOVO: Importa nossa chave secreta que dá acesso ao Firebase
const serviceAccount = require('./serviceAccountKey.json');

// NOVO: Inicializa a aplicação Firebase com as nossas credenciais
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// NOVO: Cria uma referência ao nosso banco de dados Firestore
const db = admin.firestore();

// Cria a nossa aplicação Express
const app = express();

// Define a porta em que o servidor vai rodar
const PORT = 3001; // Mantemos a 3001 para não conflitar com o React (3000)

// Rota de teste para verificar se o servidor está no ar
app.get('/', (req, res) => {
  res.send('Servidor do Projeto Marcia Art está no ar!');
});

// Inicia o servidor e o faz "ouvir" por requisições na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});