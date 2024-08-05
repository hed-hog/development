# Etapa 1: Construir a aplicação
FROM node:18 AS builder

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o código da aplicação
COPY . .

# Executar o build da aplicação
RUN npm run build

# Etapa 2: Configurar o servidor Nginx
FROM nginx:alpine

# Copiar os arquivos construídos da etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Remover a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar a nova configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d

# Expor a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
