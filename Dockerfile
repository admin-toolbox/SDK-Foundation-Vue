FROM ghcr.io/premoweb/alpine-nginx-php8:latest

USER root
COPY backend/ /var/www/html/
RUN chown -R nobody.nobody /var/www/html

ENV NODE_ENV production

USER nobody