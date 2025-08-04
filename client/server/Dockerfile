# --- Estágio 1: Construção ---
# Começamos com uma imagem oficial do Node.js. A versão 'lts' (Long-Term Support) é estável e recomendada.
FROM node:lts-alpine AS build

# Define o diretório de trabalho dentro do container. Todos os comandos seguintes serão executados a partir daqui.
WORKDIR /app

# Copia os arquivos que definem as dependências do nosso projeto para dentro do container.
COPY package.json ./
COPY package-lock.json ./

# Instala apenas as dependências de produção, ignorando pacotes de desenvolvimento que não precisamos no servidor final.
RUN npm ci --only=production

# --- Estágio 2: Produção ---
# Começamos de novo com uma imagem limpa do Node.js para manter nosso container final o menor possível.
FROM node:lts-alpine

# Define o diretório de trabalho novamente.
WORKDIR /app

# Copia as dependências que instalamos no estágio anterior.
COPY --from=build /app/node_modules ./node_modules

# Copia o resto do código do nosso servidor (index.js, serviceAccountKey.json, etc.) para o container.
COPY . .

# Expõe a porta 3001, informando ao Docker que nosso aplicativo dentro do container estará ouvindo nesta porta.
EXPOSE 3001

# O comando final que será executado quando o container iniciar. Ele inicia nosso servidor.
CMD ["node", "index.js"]