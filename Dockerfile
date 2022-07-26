FROM ghcr.io/premoweb/alpine-nginx-php7.3:latest

# Echo build date to the container
ENV BUILD_DATE $(date +%Y-%m-%dT%H:%M:%S)

USER root
COPY backend/ /var/www/html/
RUN chown -R nobody.nobody /var/www/html

ENV NODE_ENV production

USER nobody

CMD [ "/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf" ]