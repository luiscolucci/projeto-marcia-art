# --- Estágio 1: Build ---
# Começamos com uma imagem do Node.js para ter as ferramentas de build (npm)
FROM node:lts-alpine AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de definição de dependências
COPY package.json ./
COPY package-lock.json ./

# Instala todas as dependências (incluindo as de desenvolvimento)
RUN npm ci

# Copia todo o resto do código do nosso frontend
COPY . .

# O comando mais importante: executa o script de build do React.
# Isso vai gerar uma pasta 'build' com os arquivos estáticos otimizados.
RUN npm run build

# --- Estágio 2: Produção ---
# Agora, usamos uma imagem de um servidor web super leve, o Nginx.
# Ele é excelente para servir arquivos estáticos.
FROM nginx:stable-alpine

# Copia os arquivos estáticos que geramos no estágio anterior (da pasta 'build')
# para a pasta padrão que o Nginx usa para servir conteúdo web.
COPY --from=build /app/build /usr/share/nginx/html

# Expõe a porta 80, que é a porta padrão para tráfego web (HTTP).
EXPOSE 80

# O comando para iniciar o servidor Nginx quando o container for executado.
CMD ["nginx", "-g", "daemon off;"]