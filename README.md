1. Crie a estrutura do Frontend (Client) com React.

npx é uma ferramenta que vem com o Node.js. O comando abaixo irá criar uma aplicação React completa dentro de uma pasta chamada client. Isso pode levar alguns minutos.

Bash

# Cria um novo projeto React chamado 'client'
npx create-react-app client

*****************************************************************

2. Crie a estrutura do Backend (Server) com Node.js e Express.

Vamos criar a pasta e os arquivos iniciais para o "cérebro" do nosso site.

Bash

# Cria a pasta para o nosso servidor
mkdir server

# Entra na pasta do servidor
cd server

# Inicia um projeto Node.js (cria o arquivo package.json)
npm init -y

# Instala o Express.js, o framework que usaremos para construir o backend
npm install express

# Cria o arquivo principal do nosso servidor
touch index.js

*****************************************************************
3. Adicione um código inicial ao nosso servidor.

Abra a pasta projeto-marcia-art no seu VS Code.

Navegue até o arquivo server/index.js e cole o seguinte código lá dentro:

JavaScript

const express = require('express');
const app = express();
const PORT = 3001; // Usamos uma porta diferente da do React (que usa a 3000)

app.get('/api', (req, res) => {
  res.json({ message: 'Olá do servidor!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

*****************************************************************

4. Crie o arquivo .gitignore para o projeto.

Este arquivo diz ao Git quais pastas e arquivos ele deve ignorar. É uma prática essencial.

Na pasta raiz do projeto (projeto-marcia-art), crie um novo arquivo chamado .gitignore e cole o seguinte conteúdo nele:

# Dependências
/node_modules
/client/node_modules

# Arquivos de build
/client/build

# Arquivos de ambiente
.env
.env.local