# Etapa 1: Construir o Storybook
FROM node:latest AS build

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código fonte
COPY . .

# Construir o Storybook
RUN npm run build-storybook

# Etapa 2: Servir com Nginx
FROM nginx:alpine

# Copiar arquivos do build do Storybook para o diretório padrão do Nginx
COPY --from=build /app/storybook-static /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]