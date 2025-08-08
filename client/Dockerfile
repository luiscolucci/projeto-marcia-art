# --- Estágio 1: Build ---
FROM node:lts-alpine AS build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Estágio 2: Produção ---
FROM nginx:stable-alpine

# Copia os arquivos estáticos que geramos no estágio anterior
COPY --from=build /app/build /usr/share/nginx/html

# NOVO: Copia nosso script e nossa configuração customizada do Nginx
COPY ./nginx/start-nginx.sh /start-nginx.sh
COPY ./nginx/nginx.conf /etc/nginx/templates/nginx.conf

# NOVO: Dá permissão para o script ser executado
RUN chmod +x /start-nginx.sh

# Expõe a porta 8080, a porta padrão que o Cloud Run usa
EXPOSE 8080

# NOVO: Usa nosso script customizado para iniciar o Nginx
CMD ["/start-nginx.sh"]