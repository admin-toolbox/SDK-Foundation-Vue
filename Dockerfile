FROM ghcr.io/premoweb/alpine-nginx-php8:latest

# User root
USER root

ADD backend/ /var/www/html/
RUN chown -R nobody:nobody /var/www/html

ENV NODE_ENV production

USER nobody

EXPOSE 80