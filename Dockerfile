FROM ghcr.io/premoweb/alpine-nginx-php8:latest AS base

# Configure nginx
COPY webserver/config/nginx.conf /etc/nginx/nginx.conf

# Configure PHP-FPM
COPY webserver/config/fpm-pool.conf /etc/php81/php-fpm.d/www.conf
COPY webserver/config/php.ini /etc/php81/conf.d/custom.ini

# Configure supervisord
COPY webserver/config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Setup document root
RUN mkdir -p /var/www/html

RUN chown -R nobody.nobody /var/www/html && \
  chown -R nobody.nobody /run && \
  chown -R nobody.nobody /var/lib/nginx && \
  chown -R nobody.nobody /var/log/nginx

# Targeted using --target=build in Docker Compose
FROM base AS development

USER root

COPY backend/ /var/www/html
RUN chown -R nobody.nobody /var/www/html

ENV NODE_ENV development

USER nobody

EXPOSE 80

# Deployed in Caprover
FROM development AS production

USER root
ADD frontend/dist/ /var/www/html/dist/
RUN chown -R nobody.nobody /var/www/html
USER nobody