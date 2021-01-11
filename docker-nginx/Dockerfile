FROM nginx:latest
RUN mkdir /app
COPY ./default.conf /app/default.conf
ARG NGINX_PORT  
RUN cat /app/default.conf | sed  "s/__NGINX_PORT__/$NGINX_PORT/" > /etc/nginx/conf.d/default.conf