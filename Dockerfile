FROM node:12 AS build
WORKDIR /app
COPY package.json webpack.config.js .babelrc ./
RUN npm install
COPY conf ./conf
COPY src ./src
RUN npm run build:package

FROM nginx:alpine
COPY --from=dist /app/dist /usr/share/nginx/html
CMD ["nginx"]