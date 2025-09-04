#!/bin/sh
set -e

# Si no existe el archivo .env, copiarlo desde .env.example
if [ ! -f /var/www/html/.env ]; then
  cp /var/www/html/.env.example /var/www/html/.env
fi

# Crear carpeta de cache si no existe
mkdir -p /var/www/html/bootstrap/cache

# Crear base de datos sqlite si no existe
if [ ! -f /var/www/html/database/database.sqlite ]; then
  mkdir -p /var/www/html/database
  touch /var/www/html/database/database.sqlite
fi

# Dar permisos a storage y cache
chmod -R 777 /var/www/html/storage /var/www/html/bootstrap/cache

# Instalar dependencias PHP (composer)
composer install --optimize-autoloader --no-interaction

# Generar APP_KEY si no está definido
if [ -z "$(php artisan key:generate --show 2>/dev/null)" ]; then
  php artisan key:generate --force
fi

# Ejecutar migraciones en modo forzado
php artisan migrate --force

# Lanzar servidor Laravel
exec php artisan serve --host=0.0.0.0 --port=8000
