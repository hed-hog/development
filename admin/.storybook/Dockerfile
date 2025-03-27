FROM node:latest AS build

WORKDIR /app

COPY package.json ./

RUN npm install --force;

COPY . .

RUN npm run build-storybook;

FROM nginx:alpine AS production

COPY --from=build /app/storybook-static /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]