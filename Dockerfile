FROM node:12 AS build
WORKDIR /app
COPY package.json webpack.config.js .babelrc ./
RUN npm install
COPY conf ./conf
COPY src ./src
RUN npm run build:package

FROM nginx:alpine
# set file permissions for nginx user
RUN chown -R nginx:nginx /var/cache/nginx /etc/nginx/
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN echo "daemon off;" >> /etc/nginx/conf.d/default.conf
WORKDIR /usr/sbin
CMD [ "nginx" ]
#CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
#CMD ["envsubst", "'\$PORT'", "<", "/etc/nginx/conf.d/default.conf", ">", "/etc/nginx/conf.d/default.conf", "&&", "nginx", "-g", "'daemon off;'"]