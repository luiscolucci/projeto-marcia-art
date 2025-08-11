Pagina criada em Vibe Code - HTML | CSS | JS | Node | React | Banco FireBase | Docker | GCP | Automação para Deploy

Documentação Técnica Detalhada: Projeto WEB Marcia

1. Resumo do Projeto e Tecnologias
   Este documento detalha a criação de uma aplicação web full-stack para a artista Marcia Santos.
   Frontend: React.js, React Router, CSS
   Backend: Node.js, Express.js
   Banco de Dados & Storage: Google Firebase (Firestore, Storage)
   Infraestrutura e Deploy: Docker, Google Cloud Platform (Cloud Run, Artifact Registry), GitHub Actions (CI/CD)

2. Fase 1: Estrutura Inicial e Frontend (Local)
   2.1. Criação da Estrutura de Pastas e Projetos
   Criar a pasta raiz do projeto:
   Bash
   mkdir projeto-marcia-art
   cd projeto-marcia-art

Inicializar o repositório Git:
Bash
git init
git remote add origin [URL_DO_SEU_REPOSITORIO_NO_GITHUB]

Criar o projeto frontend com Create React App:
Bash
npx create-react-app client

Criar a pasta do backend:
Bash
mkdir server

Inicializar o projeto backend com Node.js:
Bash
cd server
npm init -y
cd ..

2.2. Implementação do Roteamento (Navegação)
1 - Instalar o React Router:
Bash
cd client
npm install react-router-dom

2 - Configurar App.js como Roteador Principal: O arquivo client/src/App.js foi estruturado para controlar a navegação, renderizando o Navbar e o Footer em todas as páginas e o conteúdo específico de cada rota.
Exemplo da Estrutura Final em App.js:
JavaScript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
// ... outras importações de página

function App() {
return (
<BrowserRouter>
<Navbar />
<Routes>
<Route path="/" element={<HomePage />} />
{/_ ... outras rotas _/}
</Routes>
<Footer />
</BrowserRouter>
);
}

2.3. Criação dos Componentes e Páginas
Foram criadas as pastas client/src/components (para componentes reutilizáveis como Navbar, Footer, Hero) e client/src/pages (para componentes de página inteira como HomePage, GaleriaPage).
Cada componente foi criado com seu arquivo .js (lógica e JSX) e .css (estilo).
2.4. Implementação da Responsividade
O componente Navbar.js foi refatorado para incluir um estado de controle do menu móvel:
JavaScript
const [isMenuOpen, setIsMenuOpen] = useState(false);

O arquivo Navbar.css recebeu um bloco @media screen and (max-width: 992px) para esconder os links do desktop e exibir o ícone do menu hambúrguer, que por sua vez ativa o menu lateral deslizante.

3. Fase 2: Desenvolvimento do Backend e Conexão
   3.1. Configuração do Servidor Express
   Instalar dependências do backend:
   Bash
   cd server
   npm install express cors firebase-admin

Configurar o server/index.js: O arquivo foi configurado para criar um servidor Express básico, habilitar cors e definir uma porta.
3.2. Integração com Firebase
Um projeto foi criado no console do Firebase, ativando os serviços Firestore e Storage.
Uma Conta de Serviço foi gerada, e o arquivo de chave privada serviceAccountKey.json foi baixado e colocado na pasta server.
Este arquivo foi adicionado ao .gitignore na raiz do projeto para segurança:

# .gitignore

server/serviceAccountKey.json

O server/index.js foi atualizado para usar a chave e inicializar o Firebase Admin SDK:
JavaScript
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

3.3. Criação da API de Obras
Foi adicionada uma rota GET ao server/index.js para buscar e retornar todos os documentos da coleção obras do Firestore.
Exemplo do Código da Rota:
JavaScript
app.get('/api/obras', async (req, res) => {
try {
const snapshot = await db.collection('obras').get();
const obrasList = [];
snapshot.forEach(doc => {
obrasList.push({ id: doc.id, ...doc.data() });
});
res.status(200).json(obrasList);
} catch (error) {
res.status(500).send('Erro no servidor.');
}
});

3.4. Conexão do Frontend com a API
As páginas GaleriaPage.js e LojaPage.js foram refatoradas para usar os hooks useState e useEffect para fazer uma chamada fetch à API (http://localhost:3001/api/obras) e popular a página com os dados dinâmicos.

4. Fase 3: Deploy e Automação (CI/CD)
   4.1. Containerização com Docker
   Dockerfile do Backend (server/Dockerfile):
   Dockerfile

# Estágio 1: Build

FROM node:lts-alpine AS build
WORKDIR /app
COPY package\*.json ./
RUN npm ci --only=production

# Estágio 2: Produção

FROM node:lts-alpine
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY . .
EXPOSE 3001
CMD ["node", "index.js"]

Dockerfile do Frontend (client/Dockerfile):
Dockerfile

# Estágio 1: Build

FROM node:lts-alpine AS build
WORKDIR /app
COPY package\*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio 2: Produção

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx/start-nginx.sh /start-nginx.sh
COPY ./nginx/nginx.conf /etc/nginx/templates/nginx.conf
RUN chmod +x /start-nginx.sh
EXPOSE 8080
CMD ["/start-nginx.sh"]
(Isso também exigiu a criação dos arquivos client/nginx/nginx.conf e client/nginx/start-nginx.sh para gerenciar a porta dinamicamente no Cloud Run).
4.2. Configuração do Google Cloud
Ativação das APIs: No console do GCP, foram ativadas as APIs Artifact Registry API e Cloud Run Admin API.
Criação do Repositório: Foi criado um repositório do tipo Docker no Artifact Registry, localizado em southamerica-east1.
4.3. Configuração do GitHub Actions
Criação do Secret: A chave serviceAccountKey.json foi adicionada como um "Repository Secret" no GitHub com o nome GCP_SA_KEY.
Criação do Workflow: O arquivo .github/workflows/deploy.yml foi criado para automatizar o deploy a cada push na branch main.
Principais Passos do Workflow:
Autenticação no Google Cloud usando o GCP_SA_KEY.
Criação dinâmica do arquivo serviceAccountKey.json no ambiente de execução.
Build e Push das imagens Docker do client e server para o Artifact Registry.
Deploy das novas imagens para os serviços correspondentes no Cloud Run.

5. Fluxo de Gerenciamento de Conteúdo
   Para adicionar uma nova obra ao site (sem mexer no código):
   Firebase Storage: Fazer o upload do arquivo de imagem e copiar a URL de acesso.
   Firebase Firestore: Na coleção obras, criar um novo documento, preencher os campos (title, price, etc.) e colar a URL da imagem no campo image. O site refletirá a mudança automaticamente.
