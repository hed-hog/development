# Tag exata: `node:latest` flutua e o build passaria a depender do dia em que roda.
FROM node:24.22.1 AS build

WORKDIR /app

COPY package.json ./

RUN npm install --force;

COPY . .

RUN npm run build-storybook;

# Tag exata da linha estavel do nginx: `nginx:alpine` flutua e a imagem que
# roda em producao ficou presa no Alpine 3.21.3, com openssl, libxml2, curl e
# companhia vulneraveis. O apk upgrade puxa as correcoes do Alpine que sairem
# depois da imagem base.
FROM nginx:1.30.6-alpine AS production

RUN apk upgrade --no-cache

COPY --from=build /app/storybook-static /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
