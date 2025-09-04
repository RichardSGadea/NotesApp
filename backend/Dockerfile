# Dockerfile backend
FROM php:8.2-fpm

WORKDIR /var/www/html

# Instalar dependencias de sistema y extensiones PHP necesarias
RUN apt-get update && apt-get install -y \
    libsqlite3-dev zip unzip git \
    && docker-php-ext-install pdo pdo_sqlite

# Copiar composer y hacer instalación inicial sin scripts
COPY composer.json composer.lock* ./
RUN php -r "copy('https://getcomposer.org/installer','composer-setup.php');" \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && php -r "unlink('composer-setup.php');" \
    && composer install --no-scripts --no-autoloader

# Copiar todo el proyecto
COPY . .

# Copiar entrypoint y darle permisos
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Puerto que exponemos
EXPOSE 8000

# Usar entrypoint
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
